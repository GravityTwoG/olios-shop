import { useEffect } from 'react';

import { SessionUserRole } from '@olios-shop/frontend/shared/session';
import { paths } from '@olios-shop/frontend/paths';
import { OrderStatus } from '@olios-shop/frontend/types/IOrder';

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

import { PrivatePage } from '@olios-shop/frontend/features/Auth';

import Link from 'next/link';
import { Paper } from '@olios-shop/ui/atoms/Paper';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import { Container } from '@olios-shop/ui/atoms/Container';
import { NoResults } from '@olios-shop/ui/atoms/NoResults';
import { MonetaryValue } from '@olios-shop/ui/atoms/MonetaryValue';
import { Table } from '@olios-shop/ui/molecules/Table';
import { Paginator } from '@olios-shop/ui/molecules/Paginator';
import { MetaTags } from '@olios-shop/frontend/shared/components/MetaTags';

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
