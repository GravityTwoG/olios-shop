import React, { useEffect } from 'react';

import { SessionUserRole } from '@olios-shop/admin/shared/session';
import { paths } from '@olios-shop/admin/paths';

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

import { PrivatePage } from '@olios-shop/admin/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { Input } from '@olios-shop/ui/atoms/Input';
import { Button } from '@olios-shop/ui/atoms/Button';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import { NoResults } from '@olios-shop/ui/atoms/NoResults';
import { Container } from '@olios-shop/ui/atoms/Container';
import { AppLink } from '@olios-shop/ui/atoms/AppLink';
import { Table } from '@olios-shop/ui/molecules/Table';
import { Paginator } from '@olios-shop/ui/molecules/Paginator';
import { RoleBadge } from '@olios-shop/admin/shared/components/RoleBadge';
import { MetaTags } from '@olios-shop/admin/shared/components/MetaTags';

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
      <MetaTags title="Invite Codes" />

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
