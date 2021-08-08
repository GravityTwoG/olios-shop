import {
  Model,
  Column,
  Length,
  PrimaryKey,
  Table,
  DataType,
  Unique,
  IsEmail,
} from 'sequelize-typescript';

import { UserRole } from './user-role.enum';

export type IUser = {
  id: string;
  email: string;
  isEmailVerified: boolean;
  password: string;
  roles: typeof UserRole[keyof typeof UserRole][];
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: Date;
  isActive: boolean;
};

@Table
export class User extends Model<IUser> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @IsEmail
  @Unique
  @Column
  email: string;

  @Column({ defaultValue: false })
  isEmailVerified: boolean;

  @Length({ min: 8 })
  @Column
  password: string;

  @Column({
    defaultValue: [UserRole.CUSTOMER],
    type: DataType.ARRAY(
      DataType.ENUM({
        values: Object.values(UserRole),
      }),
    ),
  })
  roles: typeof UserRole[keyof typeof UserRole][];

  @Column({ defaultValue: '' })
  firstName: string;

  @Column({ defaultValue: '' })
  lastName: string;

  @Column({ defaultValue: '' })
  patronymic: string;

  @Column({ defaultValue: '' })
  birthDate: Date;

  @Column({ defaultValue: true })
  isActive: boolean;
}
