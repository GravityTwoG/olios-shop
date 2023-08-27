import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SessionUserRole } from '@/src/shared/session';
import { OrderStatus } from '@/src/types/IOrder';

import { useUnit } from 'effector-react';
import {
  $isMarking,
  $isOrderPending,
  $order,
  delivered,
  pageMounted,
} from './index.model';

import { PrivatePage } from '@/src/features/Auth';

import { Paper } from '@/src/ui/atoms/Paper';
import { Button } from '@/src/ui/atoms/Button';
import { H1 } from '@/src/ui/atoms/Typography';
import { NoResults } from '@/src/ui/atoms/NoResults';
import { Container } from '@/src/ui/atoms/Container';
import { MonetaryValue } from '@/src/ui/atoms/MonetaryValue';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { Table } from '@/src/ui/molecules/Table';

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
                <MonetaryValue value={orderItem.price} />,
                <MonetaryValue value={orderItem.sum} />,
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
