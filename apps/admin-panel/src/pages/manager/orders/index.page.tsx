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

import { SessionUserRole } from '@olios-shop/admin/shared/session';
import { paths } from '@olios-shop/admin/paths';

import { PrivatePage } from '@olios-shop/admin/features/Auth';

import Link from 'next/link';
import { Paper } from '@olios-shop/ui/atoms/Paper';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import { Container } from '@olios-shop/ui/atoms/Container';
import { NoResults } from '@olios-shop/ui/atoms/NoResults';
import { MonetaryValue } from '@olios-shop/ui/atoms/MonetaryValue';
import { Table } from '@olios-shop/ui/molecules/Table';
import { Paginator } from '@olios-shop/ui/molecules/Paginator';
import { MetaTags } from '@olios-shop/admin/shared/components/MetaTags';

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
      <MetaTags title="Manage orders" />

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
              <MonetaryValue key="total" value={order.total} />,
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
