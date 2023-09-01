import { useEffect } from 'react';

import { SessionUserRole } from '@/src/shared/session';
import { paths } from '@/src/paths';
import { OrderStatus } from '@/src/types/IOrder';

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

import { PrivatePage } from '@/src/features/Auth';

import Link from 'next/link';
import { Paper } from '@/src/ui/atoms/Paper';
import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { NoResults } from '@/src/ui/atoms/NoResults';
import { MonetaryValue } from '@/src/ui/atoms/MonetaryValue';
import { Table } from '@/src/ui/molecules/Table';
import { Paginator } from '@/src/ui/molecules/Paginator';
import { MetaTags } from '@/src/shared/components/MetaTags';

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

const OrdersPage = () => {
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
      <MetaTags title="Orders" />

      <H1>Orders</H1>

      <Paper>
        <Table
          isLoading={isPending}
          header={headers}
          data={orders.map((order) => ({
            key: order.id,
            cols: [
              <Link href={paths.ordersView({ orderId: order.id })} key="link">
                Link
              </Link>,
              order.status,
              order.items.length,
              <div key="total" className="flex justify-between gap-4 w-full">
                <MonetaryValue value={order.total} />{' '}
                {order.status === OrderStatus.CREATED && (
                  <Link
                    href={paths.ordersPayment({ orderId: order.id })}
                    key="paylink"
                  >
                    Pay
                  </Link>
                )}
              </div>,
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

export default PrivatePage(OrdersPage, [SessionUserRole.CUSTOMER]);
