import { useEffect } from 'react';

import { useUnit } from 'effector-react';
import {
  $isPending,
  $orders,
  $ordersCount,
  $pageNumber,
  $pageSize,
  loadPage,
  pageMounted,
} from './index.model';

import { SessionUserRole } from '@/src/shared/session';
import { paths } from '@/src/paths';

import { PrivatePage } from '@/src/features/Auth';

import Link from 'next/link';
import { Paper } from '@/src/ui/atoms/Paper';
import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { NoResults } from '@/src/ui/atoms/NoResults';
import { MonetaryValue } from '@/src/ui/atoms/MonetaryValue';
import { Table } from '@/src/ui/molecules/Table';
import { Paginator } from '@/src/ui/molecules/Paginator';

const headers = [
  {
    key: 'Link',
    node: 'Link',
  },
  {
    key: 'Status',
    node: 'Status',
  },
  {
    key: 'Items',
    node: 'Items',
  },
  {
    key: 'Total',
    node: 'Total',
  },
];

const ManageOrdersPage = () => {
  const [orders, ordersCount, isPending, pageSize, pageNumber] = useUnit([
    $orders,
    $ordersCount,

    $isPending,

    $pageSize,
    $pageNumber,
  ]);

  const [loadPageEvent, pageMountedEvent] = useUnit([loadPage, pageMounted]);

  useEffect(() => {
    pageMountedEvent();
  }, [pageMountedEvent]);

  return (
    <Container className="py-8">
      <H1>Manage Orders</H1>

      <Paper>
        <Table
          isLoading={isPending}
          header={headers}
          data={orders.map((order) => ({
            key: order.id,
            cols: [
              <Link
                href={paths.manageOrdersView({ orderId: order.id })}
                key="link"
              >
                Link
              </Link>,
              order.status,
              order.items.length,
              <MonetaryValue value={order.total} />,
            ],
          }))}
          emptyComponent={<NoResults>No orders</NoResults>}
        />

        <Paginator
          count={ordersCount}
          pageSize={pageSize}
          currentPage={pageNumber}
          onPageSelect={loadPageEvent}
        />
      </Paper>
    </Container>
  );
};

export default PrivatePage(ManageOrdersPage, [SessionUserRole.MANAGER]);
