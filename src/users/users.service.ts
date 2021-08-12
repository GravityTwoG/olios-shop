import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomerProfilesService } from '../profiles/customers/customer-profiles.service';
import { BasketsService } from '../baskets/baskets.service';

import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UserRole } from './user-role.enum';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { mapUserEntityToDto } from './mapUserEntityToDto';

const PG_DUPLICATION_ERROR_CODE = '23505';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly customerProfilesService: CustomerProfilesService,
    private readonly basketsService: BasketsService,
    private readonly connection: Connection,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.usersRepository.find({ loadRelationIds: true });
    return users.map(mapUserEntityToDto);
  }

  async getUser(filter: { id: string } | { email: string }): Promise<UserDto> {
    const user = await this.usersRepository.getUser(filter);
    return mapUserEntityToDto(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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

      if (user.roles.includes(UserRole.CUSTOMER)) {
        // create customer profile
        const customerProfile =
          this.customerProfilesService.generateProfile(user);
        await queryRunner.manager.save(customerProfile);

        // create basket for customer
        const basket = this.basketsService.generateBasket({ customerProfile });
        await queryRunner.manager.save(basket);

        // add basket to customer profile
        customerProfile.basket = basket;
        await queryRunner.manager.save(customerProfile);

        // add customerProfile to user
        user.customerProfile = customerProfile;
        await queryRunner.manager.save(user);
      }
      await queryRunner.commitTransaction();

      return user;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      if (err.code === PG_DUPLICATION_ERROR_CODE) {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
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
