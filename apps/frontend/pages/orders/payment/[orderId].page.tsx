import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SessionUserRole } from '@olios-shop/frontend/shared/session';

import { useUnit } from 'effector-react';
import { $isOrderPending, $order, pageMounted } from './index.model';

import { PrivatePage } from '@olios-shop/frontend/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { H1 } from '@olios-shop/ui/atoms/Typography';
import { CTAButton } from '@olios-shop/ui/atoms/CTAButton';
import { Container } from '@olios-shop/ui/atoms/Container';
import { MonetaryValue } from '@olios-shop/ui/atoms/MonetaryValue';
import { Preloader } from '@olios-shop/ui/molecules/Preloader';
import { InputField } from '@olios-shop/ui/molecules/Field';
import { MetaTags } from '@olios-shop/frontend/shared/components/MetaTags';

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

          <form>
            <InputField label="Card number" />
            <InputField label="Card date" />
            <InputField label="Card CVC" />
            <InputField label="Card Holder" />

            <CTAButton type="submit">PAY</CTAButton>
          </form>
        </Paper>
      </Preloader>
    </Container>
  );
};

export default PrivatePage(OrdersPaymentPage, [SessionUserRole.CUSTOMER]);
