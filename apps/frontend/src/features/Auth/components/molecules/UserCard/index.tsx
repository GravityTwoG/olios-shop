import { IUser } from '@/src/types/IUser';

import classes from './user-card.module.scss';

import { Skeleton } from '@/src/ui/atoms/Skeleton';

export type UserCardProps = {
  user: IUser;
  isLoaded: boolean;
};

export const UserCard = ({ user, isLoaded }: UserCardProps) => {
  return (
    <div className={classes.card}>
      <dl className={classes['user_info']}>
        <div>
          <dt>ID</dt>
          <dd>{isLoaded ? user.id : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Name</dt>
          <dd>{isLoaded ? user.firstName : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Last Name</dt>
          <dd>{isLoaded ? user.lastName : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Patronymic</dt>
          <dd>{isLoaded ? user.patronymic : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Birth Date</dt>
          <dd>{isLoaded ? user.birthDate : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Email</dt>
          <dd>{isLoaded ? user.email : <Skeleton />}</dd>
        </div>

        <div>
          <dt>Role</dt>
          <dd>{isLoaded ? user.role : <Skeleton />}</dd>
        </div>
      </dl>
    </div>
  );
};
