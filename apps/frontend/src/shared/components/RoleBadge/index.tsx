import { IEmployeeRole, IUserRole } from '@/src/types/IUser';
import clsx from 'clsx';

export type RoleBadgeProps = {
  role: IUserRole | IEmployeeRole;
};

export const RoleBadge = (props: RoleBadgeProps) => {
  return (
    <span
      className={clsx(
        'py-1 px-2 text-white rounded-full text-xs tracking-wide whitespace-nowrap',
        classMap[props.role],
      )}
    >
      {roleNameMap[props.role]}
    </span>
  );
};

const classMap = {
  [IUserRole.CUSTOMER]: 'bg-green-600',
  [IUserRole.MANAGER]: 'bg-stone-950',
  [IUserRole.CONTENT_MANAGER]: 'bg-indigo-600',
};

const roleNameMap = {
  [IUserRole.CUSTOMER]: 'Customer',
  [IUserRole.MANAGER]: 'Manager',
  [IUserRole.CONTENT_MANAGER]: 'Content Manager',
};
