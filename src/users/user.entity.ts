import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRole } from './user-role.enum';
import { CustomerProfile } from '../profiles/customers/customer-profile.entity';

export type IUser = {
  id: string;
  customerProfile: CustomerProfile;
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
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => CustomerProfile, {
    cascade: ['insert', 'update', 'remove', 'soft-remove', 'recover'],
    nullable: true,
  })
  @JoinColumn({ name: 'customer_profile_id' })
  customerProfile: CustomerProfile;

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
