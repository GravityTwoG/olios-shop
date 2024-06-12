import classes from './main-layout.module.scss';

import { Sidebar } from '@olios-shop/admin/shared/components/Sidebar';
import { AppToaster } from '@olios-shop/admin/shared/toasts';

export type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className={classes.App}>
      <Sidebar />

      <div className={classes.content}>{props.children}</div>
      <AppToaster />
    </div>
  );
};
