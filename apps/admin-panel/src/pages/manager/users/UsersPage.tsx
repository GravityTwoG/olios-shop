import { useEffect } from 'react';

import { useUnit } from 'effector-react';
import {
  $isBlockingOrUnblocking,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  $users,
  $usersCount,
  blockUser,
  loadPage,
  pageMounted,
  searchQueryChanged,
  unblockUser,
} from './index.model';

import { SessionUserRole, useUser } from '@olios-shop/admin/shared/session';
import { PrivatePage } from '@olios-shop/admin/features/Auth';

import { Input } from '@olios-shop/ui/atoms/Input';
import { Paper } from '@olios-shop/ui/atoms/Paper';
import { Button } from '@olios-shop/ui/atoms/Button';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import { Container } from '@olios-shop/ui/atoms/Container';
import { Table } from '@olios-shop/ui/molecules/Table';
import { Paginator } from '@olios-shop/ui/molecules/Paginator';
import { NoResults } from '@olios-shop/ui/atoms/NoResults';
import { RoleBadge } from '@olios-shop/admin/shared/components/RoleBadge';

const headers = [
  {
    key: 'name',
    node: 'Name',
  },
  { key: 'email', node: 'Email' },
  { key: 'birth-date', node: 'Birth Date' },
  { key: 'role', node: 'Role' },
];

export const UsersPage = PrivatePage(() => {
  const [
    users,
    usersCount,
    isPending,
    isBlockingOrUnblocking,
    pageSize,
    pageNumber,
    searchQuery,
  ] = useUnit([
    $users,
    $usersCount,
    $isPending,
    $isBlockingOrUnblocking,
    $pageSize,
    $pageNumber,
    $searchQuery,
  ]);

  const [
    blockUserEvent,
    loadPageEvent,
    pageMountedEvent,
    searchQueryChangedEvent,
    unblockUserEvent,
  ] = useUnit([
    blockUser,
    loadPage,
    pageMounted,
    searchQueryChanged,
    unblockUser,
  ]);

  const currentUserId = useUser().id;

  useEffect(() => {
    pageMountedEvent();
  }, [pageMountedEvent]);

  return (
    <Container className="py-8">
      <H1>Users</H1>

      <Paper>
        <Input
          value={searchQuery}
          onChange={(e) => searchQueryChangedEvent(e.target.value)}
        />

        <Table
          isLoading={isPending}
          header={headers}
          data={users.map((user) => ({
            key: user.id,
            cols: [
              `${user.firstName} ${user.lastName} ${user.patronymic}`,
              user.email,
              user.birthDate,
              <div
                key="action"
                className="flex items-center justify-between gap-3"
              >
                <RoleBadge role={user.role} />
                {currentUserId !== user.id && (
                  <Button
                    isLoading={isBlockingOrUnblocking}
                    onClick={() =>
                      user.isActive
                        ? blockUserEvent(user.id)
                        : unblockUserEvent(user.id)
                    }
                  >
                    {user.isActive ? 'Block' : 'Unblock'}
                  </Button>
                )}
              </div>,
            ],
          }))}
          emptyComponent={<NoResults>No Results</NoResults>}
        />

        <Paginator
          pageSize={pageSize}
          currentPage={pageNumber}
          count={usersCount}
          onPageSelect={loadPageEvent}
        />
      </Paper>
    </Container>
  );
}, [SessionUserRole.MANAGER]);
