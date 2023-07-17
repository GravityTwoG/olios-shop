import React, { useEffect } from 'react';

import { IUserRole } from '@/src/types/IUser';

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

import { useUser } from '@/src/shared/session';
import { PrivatePage } from '@/src/features/Auth';

import Head from 'next/head';
import { Input } from '@/src/ui/atoms/Input';
import { Paper } from '@/src/ui/atoms/Paper';
import { Button } from '@/src/ui/atoms/Button';
import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { Table } from '@/src/ui/molecules/Table';
import { Paginator } from '@/src/ui/molecules/Paginator';
import { NoResults } from '@/src/ui/atoms/NoResults';
import { RoleBadge } from '@/src/shared/components/RoleBadge';

const headers = [
  {
    key: 'name',
    node: 'Name',
  },
  { key: 'email', node: 'Email' },
  { key: 'birth-date', node: 'Birth Date' },
  { key: 'role', node: 'Role' },
];

export function UsersPage() {
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
  const currentUserId = useUser().id;

  useEffect(() => {
    pageMounted();
  }, []);

  return (
    <Container className="py-8">
      <Head>
        <title>Olios Shop | Users</title>
      </Head>
      <H1>Users</H1>

      <Paper>
        <Input
          value={searchQuery}
          onChange={(e) => searchQueryChanged(e.target.value)}
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
                      user.isActive ? blockUser(user.id) : unblockUser(user.id)
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
          onPageSelect={loadPage}
        />
      </Paper>
    </Container>
  );
}

export default PrivatePage(UsersPage, [IUserRole.MANAGER]);
