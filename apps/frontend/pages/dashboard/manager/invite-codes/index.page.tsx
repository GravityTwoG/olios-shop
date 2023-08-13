import React, { useEffect } from 'react';

import { SessionUserRole } from '@/src/shared/session';
import { paths } from '@/src/paths';

import { useUnit } from 'effector-react';
import {
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
import { NoResults } from '@/src/ui/atoms/NoResults';
import { Container } from '@/src/ui/atoms/Container';
import { AppLink } from '@/src/ui/atoms/AppLink';
import { Table } from '@/src/ui/molecules/Table';
import { Paginator } from '@/src/ui/molecules/Paginator';
import { RoleBadge } from '@/src/shared/components/RoleBadge';

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
    isPending,
    pageSize,
    pageNumber,
    searchQuery,
    isDeleting,
  ] = useUnit([
    $inviteCodes,
    $inviteCodesCount,
    $isPending,
    $pageSize,
    $pageNumber,
    $searchQuery,
    $isDeleting,
  ]);

  const [
    deleteInviteCodeEvent,
    loadPageEvent,
    pageMountedEvent,
    searchQueryChangedEvent,
  ] = useUnit([deleteInviteCode, loadPage, pageMounted, searchQueryChanged]);

  useEffect(() => {
    pageMountedEvent();
  }, [pageMountedEvent]);

  return (
    <Container className="py-8">
      <Head>
        <title>Olios Shop | Invite Codes</title>
      </Head>
      <H1>Invite Codes</H1>

      <div className="flex justify-center my-4">
        <AppLink href={paths.inviteCodesCreate({})}>
          Create Invite Codes
        </AppLink>
      </div>

      <Paper>
        <Input
          value={searchQuery}
          onChange={(e) => searchQueryChangedEvent(e.target.value)}
        />

        <Table
          isLoading={isPending}
          header={headers}
          data={inviteCodes.map((invite) => ({
            key: invite.id,
            cols: [
              `${invite.firstName} ${invite.lastName} ${invite.patronymic}`,
              invite.birthDate,
              <RoleBadge key="role" role={invite.role} />,
              invite.code,
              <div
                key="action"
                className="flex items-center justify-between gap-3"
              >
                <p>{invite.isUsed ? 'yes' : 'no'}</p>
                {!invite.isUsed && (
                  <Button
                    isLoading={isDeleting}
                    onClick={() => deleteInviteCodeEvent(invite.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>,
            ],
          }))}
          emptyComponent={<NoResults>No Invite codes</NoResults>}
        />

        <Paginator
          pageSize={pageSize}
          currentPage={pageNumber}
          count={inviteCodesCount}
          onPageSelect={loadPageEvent}
        />
      </Paper>
    </Container>
  );
}

export default PrivatePage(InviteCodesPage, [SessionUserRole.MANAGER]);
