import { Field, ID, ObjectType } from '@nestjs/graphql';

import { CustomerProfileType } from '../profiles/customers/customer-profile.type';

import { UserRole } from './user-role.enum';

@ObjectType('user')
export class UserType {
  @Field(() => ID)
  id: string;

  @Field(() => CustomerProfileType)
  customerProfile: CustomerProfileType;

  @Field()
  email: string;

  @Field()
  isEmailVerified: boolean;

  @Field()
  password: string;

  @Field(() => [ID])
  roles: UserRole[];

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  patronymic: string;

  @Field()
  birthDate: Date;

  @Field()
  isActive: boolean;
}
