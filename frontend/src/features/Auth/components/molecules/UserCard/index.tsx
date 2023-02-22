import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { IUser } from '@/src/types/IUser';

import classes from './user-card.module.scss';

export type UserCardProps = {
  user: IUser;
  isAuthorizationChecked: boolean;
};

export const UserCard = ({ user, isAuthorizationChecked }: UserCardProps) => {
  return (
    <div className={classes.card}>
      <dl className={classes['user_info']}>
        <div>
          <dt>ID</dt>
          <dd>{isAuthorizationChecked ? user.id : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Name</dt>
          <dd>{isAuthorizationChecked ? user.firstName : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Last Name</dt>
          <dd>{isAuthorizationChecked ? user.lastName : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Patronymic</dt>
          <dd>{isAuthorizationChecked ? user.patronymic : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Birth Date</dt>
          <dd>{isAuthorizationChecked ? user.birthDate : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Email</dt>
          <dd>{isAuthorizationChecked ? user.email : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Role</dt>
          <dd>{isAuthorizationChecked ? user.role : <Skeleton />}</dd>
        </div>
      </dl>
    </div>
  );
};
