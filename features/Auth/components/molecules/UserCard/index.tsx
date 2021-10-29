import classes from './user-card.module.scss';

import { IUser } from '../../../types';

export type UserCardProps = {
  user: IUser;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={classes.card}>
      <dl className={classes['user_info']}>
        <div>
          <dt>ID</dt>
          <dd>{user.id.slice(0, 16)}...</dd>
        </div>

        <div>
          <dt>Name</dt>
          <dd>{user.firstName}</dd>
        </div>

        <div>
          <dt>Last Name</dt>
          <dd>{user.lastName}</dd>
        </div>

        <div>
          <dt>Patronymic</dt>
          <dd>{user.patronymic}</dd>
        </div>

        <div>
          <dt>Birth Date</dt>
          {/*<dd>{user.birthDate}</dd>*/}
        </div>

        <div>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>

        <div>
          <dt>Roles</dt>
          <dd>{user.roles.map((r) => `${r} `)}</dd>
        </div>
      </dl>
    </div>
  );
};
