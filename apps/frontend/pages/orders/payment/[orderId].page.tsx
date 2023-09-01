import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SessionUserRole } from '@/src/shared/session';

import { useUnit } from 'effector-react';
import { $isOrderPending, $order, pageMounted } from './index.model';

import { PrivatePage } from '@/src/features/Auth';

import { Paper } from '@/src/ui/atoms/Paper';
import { H1 } from '@/src/ui/atoms/Typography';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Container } from '@/src/ui/atoms/Container';
import { MonetaryValue } from '@/src/ui/atoms/MonetaryValue';
import { Preloader } from '@/src/ui/molecules/Preloader';
import { Form } from '@/src/ui/molecules/Form';
import { InputField } from '@/src/ui/molecules/Field';
import { MetaTags } from '@/src/shared/components/MetaTags';

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
      <MetaTags title={`Order payment ${order.id}`} />

      <H1>Payment</H1>

      <Preloader isLoading={isOrderPending}>
        <Paper>
          <p>
            Country: {order.country}, City: {order.city}, Street: {order.street}
            , House: {order.house}, Flat: {order.flat}, Floor: {order.floor}
          </p>

          <p>Name: {order.name}</p>
          <p>phoneNumber: {order.phoneNumber}</p>

          <p>
            Total: <MonetaryValue value={order.total} />
          </p>

          <Form>
            <InputField label="Card number" />
            <InputField label="Card date" />
            <InputField label="Card CVC" />
            <InputField label="Card Holder" />

            <CTAButton type="submit">PAY</CTAButton>
          </Form>
        </Paper>
      </Preloader>
    </Container>
  );
};

export default PrivatePage(OrdersPaymentPage, [SessionUserRole.CUSTOMER]);
