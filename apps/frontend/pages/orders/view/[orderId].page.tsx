import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SessionUserRole } from '@/src/shared/session';

import { useUnit } from 'effector-react';
import { $isOrderPending, $order, pageMounted } from './index.model';

import { PrivatePage } from '@/src/features/Auth';

import { Paper } from '@/src/ui/atoms/Paper';
import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { Table } from '@/src/ui/molecules/Table';
import { NoResults } from '@/src/ui/atoms/NoResults';

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
  const router = useRouter();
  const orderId = router.query.orderId;

  const [order, isOrderPending, pageMountedEvent] = useUnit([
    $order,
    $isOrderPending,
    pageMounted,
  ]);

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
          <p>Status: {order.status}</p>

          <Table
            isLoading={isOrderPending}
            header={headers}
            data={order.items.map((orderItem) => ({
              key: orderItem.id,
              cols: [
                orderItem.name,
                orderItem.quantity,
                orderItem.price,
                orderItem.sum,
              ],
            }))}
            emptyComponent={<NoResults>No products</NoResults>}
          />

          <p>Total: {order.total}</p>

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

export default PrivatePage(OrdersPaymentPage, [SessionUserRole.CUSTOMER]);
