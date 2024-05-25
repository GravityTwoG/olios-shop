import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SessionUserRole } from '@olios-shop/admin/shared/session';
import { OrderStatus } from '@olios-shop/admin/types/IOrder';

import { useUnit } from 'effector-react';
import {
  $isMarking,
  $isOrderPending,
  $order,
  delivered,
  pageMounted,
} from './index.model';

import { PrivatePage } from '@olios-shop/admin/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { Button } from '@olios-shop/ui/atoms/Button';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import { NoResults } from '@olios-shop/ui/atoms/NoResults';
import { Container } from '@olios-shop/ui/atoms/Container';
import { MonetaryValue } from '@olios-shop/ui/atoms/MonetaryValue';
import { Preloader } from '@olios-shop/ui/molecules/Preloader';
import { Table } from '@olios-shop/ui/molecules/Table';
import { MetaTags } from '@olios-shop/admin/shared/components/MetaTags';

const headers = [
  {
    key: 'Name',
    node: 'Name',
  },
  {
    key: 'Quantity',
    node: 'Quantity',
  },
  {
    key: 'Price',
    node: 'Price',
  },
  {
    key: 'Sum',
    node: 'Sum',
  },
];

const OrdersPaymentPage = () => {
  const [order, isOrderPending, isMarking] = useUnit([
    $order,
    $isOrderPending,
    $isMarking,
  ]);
  const [deliveredEvent, pageMountedEvent] = useUnit([delivered, pageMounted]);

  const router = useRouter();
  const orderId = router.query.orderId;
  useEffect(() => {
    if (orderId && typeof orderId === 'string') {
      pageMountedEvent(orderId);
    }
  }, [pageMountedEvent, orderId]);

  return (
    <Container className="py-8">
      <MetaTags title={`Order ${order.id}`} />

      <H1>Order {order.id}</H1>

      <Preloader isLoading={isOrderPending}>
        <Paper>
          <div className="mb-4 flex gap-4 items-center justify-between">
            <p>Status: {order.status}</p>
            {order.status === OrderStatus.PAID && (
              <Button isLoading={isMarking} onClick={() => deliveredEvent()}>
                Mark as delivered
              </Button>
            )}
          </div>

          <Table
            isLoading={isOrderPending}
            header={headers}
            data={order.items.map((orderItem) => ({
              key: orderItem.id,
              cols: [
                orderItem.name,
                orderItem.quantity,
                <MonetaryValue key="price" value={orderItem.price} />,
                <MonetaryValue key="sum" value={orderItem.sum} />,
              ],
            }))}
            emptyComponent={<NoResults>No products</NoResults>}
          />

          <p>
            Total: <MonetaryValue value={order.total} />
          </p>

          <p>Country: {order.country}</p>
          <p>City: {order.city}</p>
          <p>Street: {order.street}</p>
          <p>House: {order.house}</p>
          <p>Flat: {order.flat}</p>
          <p>Floor: {order.floor}</p>

          <p>Name: {order.name}</p>
          <p>Phone Number: {order.phoneNumber}</p>
        </Paper>
      </Preloader>
    </Container>
  );
};

export default PrivatePage(OrdersPaymentPage, [SessionUserRole.MANAGER]);
