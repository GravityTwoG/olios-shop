import React, { useEffect } from 'react';

import { IUserRole } from '@/src/types/IUser';

import { useUnit } from 'effector-react';
import {
  $error,
  $isBlockingOrUnblocking,
  $isPending,
  $pageNumber,
  $pageSize,
  $users,
  $usersCount,
  blockUser,
  loadPage,
  pageMounted,
  unblockUser,
} from './index.model';

import { useUser } from '@/src/shared/session';
import { PrivatePage } from '@/src/features/Auth';

import Head from 'next/head';
import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { Paper } from '@/src/ui/atoms/Paper';
import { Button } from '@/src/ui/atoms/Button';
import { Table } from '@/src/ui/molecules/Table';
import { Paginator } from '@/src/ui/molecules/Paginator';
import { ErrorText } from '@/src/ui/atoms/ErrorText';

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
    isPenging,
    error,
    isBlockingOrUnblocking,
    pageSize,
    pageNumber,
  ] = useUnit([
    $users,
    $usersCount,
    $isPending,
    $error,
    $isBlockingOrUnblocking,
    $pageSize,
    $pageNumber,
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
        {error && (
          <div>
            <ErrorText>Error: {error}</ErrorText>
          </div>
        )}

        <Table
          isLoading={isPenging}
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
                <p>{user.role}</p>
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
