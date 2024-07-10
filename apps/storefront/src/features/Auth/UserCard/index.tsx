import clsx from 'clsx';

import classes from './user-card.module.scss';

import { SessionUser } from '@olios-shop/storefront/shared/session';

import { Skeleton } from '@olios-shop/ui/atoms/Skeleton';

export type UserCardProps = {
  user: SessionUser;
  isLoaded: boolean;
  className?: string;
};

export const UserCard = ({ user, isLoaded, className }: UserCardProps) => {
  return (
    <div className={clsx(classes.card, className)}>
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
      </dl>
    </div>
  );
};
