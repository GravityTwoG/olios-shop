import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column()
  password: string;

  @Column({
    default: [UserRole.CUSTOMER],
    type: 'enum',
    array: true,
    enum: UserRole,
  })
  roles: typeof UserRole[keyof typeof UserRole][];

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  patronymic: string;

  @Column({ default: 'NOW()' })
  birthDate: Date;

  @Column({ default: true })
  isActive: boolean;
}
