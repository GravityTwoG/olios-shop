import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'typeorm';

import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { UserRole } from './user-role.enum';
import { CustomerProfilesService } from '../profiles/customers/customer-profiles.service';
import { CustomerProfile } from '../profiles/customers/customer-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly customerProfilesService: CustomerProfilesService,
    private readonly connection: Connection,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['customerProfile'] });
  }

  getUser(filter: { id: string } | { email: string }): Promise<User> {
    return this.usersRepository.getUser(filter);
  }

  async createUser(createUserDto: RegisterUserDto): Promise<User> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password } = createUserDto;
      const user = this.usersRepository.create({
        email,
        password,
        customerProfile: null,
      });
      await queryRunner.manager.save(user);

      // create profile
      if (user.roles.includes(UserRole.CUSTOMER)) {
        const customerProfile =
          this.customerProfilesService.generateProfile(user);
        await queryRunner.manager.save(customerProfile);

        await queryRunner.manager.update<User>(
          User,
          { id: user.id },
          {
            customerProfile: customerProfile,
          },
        );
      }

      await queryRunner.commitTransaction();
      return user;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
  }
}
