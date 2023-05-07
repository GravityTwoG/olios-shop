import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, User, UserRole } from '@prisma/client';
import { DomainException, DomainExceptionCodes } from 'src/domain.exception';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import { comparePasswords, hashPassword } from './core/passwords-hashing';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterEmployeeDto } from './dto/register-employee.dto';

import { InviteCodesService } from './invite-codes/invite-codes.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private inviteCodesService: InviteCodesService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ user: User; error: null } | { user: null; error: string }> {
    try {
      const user = await this.usersService.getUser({ email });

      if (!user) {
        return { user: null, error: 'Invalid credentials' };
      }
      const areEqual = comparePasswords({
        hashedPassword: user.password,
        passwordSalt: user.passwordSalt,
        enteredPassword: password,
      });
      if (!areEqual) {
        return { user: null, error: 'Invalid credentials' };
      }
      return { user, error: null };
    } catch (err) {
      if (err instanceof NotFoundException) {
        return { user: null, error: 'Invalid credentials' };
      }

      return { user: null, error: 'Invalid credentials' };
    }
  }

  async registerEmployee(registerUserDto: RegisterEmployeeDto): Promise<User> {
    const { email, password, inviteCode: inviteCodeInput } = registerUserDto;

    const inviteCode = await this.inviteCodesService.getInviteCode({
      code: inviteCodeInput,
    });

    if (!inviteCode) {
      throw new DomainException(
        DomainExceptionCodes.NOT_FOUND,
        'Invite-code not found.',
      );
    }

    if (inviteCode.isUsed) {
      throw new DomainException(
        DomainExceptionCodes.ALREADY_USED,
        'Invite-code was already used.',
      );
    }

    return this.prisma.$transaction(async (prisma) => {
      const user = await this.createUserInTransaction(
        {
          email,
          password,
          firstName: inviteCode.firstName,
          lastName: inviteCode.lastName,
          patronymic: inviteCode.patronymic,
          birthDate: inviteCode.birthDate,
          role: inviteCode.role,
        },
        prisma,
      );

      await this.inviteCodesService.updateInviteCodeInTransaction(
        {
          where: { code: inviteCode.code },
          data: {
            isUsed: true,
            usedBy: user.id,
          },
        },
        prisma,
      );

      return user;
    });
  }

  async registerCustomer(registerUserDto: RegisterCustomerDto): Promise<User> {
    return this.prisma.$transaction((prisma) => {
      return this.createUserInTransaction(
        { ...registerUserDto, role: UserRole.CUSTOMER },
        prisma,
      );
    });
  }

  async createUserInTransaction(
    registerUserDto: Omit<CreateUserDto, 'passwordSalt'>,
    prisma: Prisma.TransactionClient,
  ): Promise<User> {
    const {
      role,
      email,
      password,
      birthDate,
      firstName,
      lastName,
      patronymic,
    } = registerUserDto;
    const { salt, hash } = hashPassword(password);

    return this.usersService.createUserInTransaction(
      {
        role,
        email,
        passwordSalt: salt,
        password: hash,
        birthDate,
        firstName,
        lastName,
        patronymic,
      },
      prisma,
    );
  }
}
