import React, { useEffect } from 'react';

import { IUserRole } from '@/src/types/IUser';

import { useUnit } from 'effector-react';
import {
  $error,
  $inviteCodes,
  $inviteCodesCount,
  $isDeleting,
  $isPending,
  $pageNumber,
  $pageSize,
  $searchQuery,
  deleteInviteCode,
  loadPage,
  pageMounted,
  searchQueryChanged,
} from './index.model';

import { PrivatePage } from '@/src/features/Auth';

import Head from 'next/head';
import { Paper } from '@/src/ui/atoms/Paper';
import { Input } from '@/src/ui/atoms/Input';
import { Button } from '@/src/ui/atoms/Button';
import { H1 } from '@/src/ui/atoms/Typography';
import { ErrorText } from '@/src/ui/atoms/ErrorText';
import { Container } from '@/src/ui/atoms/Container';
import { Table } from '@/src/ui/molecules/Table';
import { Paginator } from '@/src/ui/molecules/Paginator';
import { Flex } from '@/src/ui/atoms/Flex';
import Link from 'next/link';
import { paths } from '@/src/paths';

const headers = [
  { key: 'name', node: 'Name' },
  { key: 'birth-date', node: 'Birth Date' },
  { key: 'role', node: 'Role' },
  {
    key: 'code',
    node: 'Code',
  },
  {
    key: 'used',
    node: 'Is used',
  },
];

export function InviteCodesPage() {
  const [
    inviteCodes,
    inviteCodesCount,
    isPenging,
    error,
    pageSize,
    pageNumber,
    searchQuery,
    isDeleting,
  ] = useUnit([
    $inviteCodes,
    $inviteCodesCount,
    $isPending,
    $error,
    $pageSize,
    $pageNumber,
    $searchQuery,
    $isDeleting,
  ]);

  useEffect(() => {
    pageMounted();
  }, []);

  return (
    <Container className="py-8">
      <Head>
        <title>Olios Shop | Invite Codes</title>
      </Head>
      <H1>Invite Codes</H1>

      <Flex jcc margin="1rem 0">
        <Link href={paths.inviteCodesCreate({})}>Create Invite Codes</Link>
      </Flex>

      <Paper>
        {error && (
          <div>
            <ErrorText>Error: {error}</ErrorText>
          </div>
        )}

        <Input
          value={searchQuery}
          onChange={(e) => searchQueryChanged(e.target.value)}
        />

        <Table
          isLoading={isPenging}
          header={headers}
          data={inviteCodes.map((invite) => ({
            key: invite.id,
            cols: [
              `${invite.firstName} ${invite.lastName} ${invite.patronymic}`,
              invite.birthDate,
              invite.role,
              invite.code,
              <div
                key="action"
                className="flex items-center justify-between gap-3"
              >
                <p>{invite.isUsed ? 'yes' : 'no'}</p>
                {!invite.isUsed && (
                  <Button
                    isLoading={isDeleting}
                    onClick={() => deleteInviteCode(invite.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>,
            ],
          }))}
        />

        <Paginator
          pageSize={pageSize}
          currentPage={pageNumber}
          count={inviteCodesCount}
          onPageSelect={loadPage}
        />
      </Paper>
    </Container>
  );
}

export default PrivatePage(InviteCodesPage, [IUserRole.MANAGER]);
