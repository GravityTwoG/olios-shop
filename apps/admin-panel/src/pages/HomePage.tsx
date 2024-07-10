import { paths } from '../config/paths';
import { SessionUserRole } from '../shared/session';

import { PrivatePage } from '../features/Auth';

import { AppLink } from '../ui/atoms/AppLink';
import { RoleGuard } from '../shared/components/RoleGuard';

export const HomePage = PrivatePage(() => {
  return (
    <div>
      <RoleGuard roles={[SessionUserRole.MANAGER]}>
        <div className="flex justify-center my-4">
          <AppLink to={paths.orders({})}>Orders</AppLink>
        </div>
        <div className="flex justify-center my-4">
          <AppLink to={paths.inviteCodes({})}>Invite Codes</AppLink>
        </div>
        <div className="flex justify-center my-4">
          <AppLink to={paths.users({})}>Users</AppLink>
        </div>
      </RoleGuard>

      <RoleGuard roles={[SessionUserRole.CONTENT_MANAGER]}>
        <p className="my-8">
          <AppLink to={paths.categories({})}>Manage categories</AppLink>
        </p>
        <p className="my-8">
          <AppLink to={paths.products({})}>Manage products</AppLink>
        </p>
      </RoleGuard>
    </div>
  );
}, [SessionUserRole.MANAGER, SessionUserRole.CONTENT_MANAGER]);
