import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUnit } from 'effector-react';

import { SessionUserRole } from '@olios-shop/storefront/shared/session';
import { paths } from '@olios-shop/storefront/paths';

import {
  $cart,
  $isCartPending,
  $isCreating,
  formSubmitted,
  orderCreated,
  pageMounted,
} from './index.model';

import { PrivatePage } from '@olios-shop/storefront/features/Auth';

import { Paper } from '@olios-shop/ui/atoms/Paper';
import { H1, H2 } from '@olios-shop/ui/atoms/Typography';
import { Container } from '@olios-shop/ui/atoms/Container';
import { NoResults } from '@olios-shop/ui/atoms/NoResults';
import { MonetaryValue } from '@olios-shop/ui/atoms/MonetaryValue';
import { Table } from '@olios-shop/ui/molecules/Table';
import { Form } from '@olios-shop/ui/molecules/Form';
import { MetaTags } from '@olios-shop/storefront/shared/components/MetaTags';

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

const CreateOrderPage = () => {
  const router = useRouter();
  const cartId = router.query.cartId;

  const [cart, isCartPending, isCreating] = useUnit([
    $cart,
    $isCartPending,
    $isCreating,
  ]);

  const [formSubmittedEvent, pageMountedEvent] = useUnit([
    formSubmitted,
    pageMounted,
  ]);

  useEffect(() => {
    if (cartId && typeof cartId === 'string') {
      pageMountedEvent(cartId);
    }
  }, [pageMountedEvent, cartId]);

  useEffect(() => {
    orderCreated.watch((order) => {
      router.push(paths.ordersPayment({ orderId: order.id }));
    });
  }, [router]);

  return (
    <Container>
      <MetaTags title="New order" />

      <H1>Create Order</H1>

      <Paper>
        <H2>Products</H2>

        <Table
          isLoading={isCartPending}
          header={headers}
          data={cart.items.map((cartItem) => ({
            key: cartItem.id,
            cols: [
              cartItem.productName,
              cartItem.quantity,
              <MonetaryValue key="price" value={cartItem.realPrice} />,
              <MonetaryValue key="sum" value={cartItem.sum} />,
            ],
          }))}
          emptyComponent={<NoResults>No products</NoResults>}
        />

        <div className="my-4 flex justify-end items-center gap-6">
          Total: {cart.total}
        </div>

        <Form
          className="my-4"
          title="Shipping Info"
          config={{
            country: {
              type: 'text',
              label: 'Country',
              placeholder: 'Country',
              required: 'Country is required!',
            },
            city: {
              type: 'text',
              label: 'City',
              placeholder: 'City',
              required: 'City is required!',
            },
            street: {
              type: 'text',
              label: 'Street',
              placeholder: 'Street',
              required: 'Street is required!',
            },
            house: {
              type: 'text',
              label: 'House',
              placeholder: 'House',
              required: 'House is required!',
            },
            flat: {
              type: 'text',
              label: 'Flat',
              placeholder: 'Flat',
              required: 'Flat is required!',
            },
            floor: {
              type: 'number',
              label: 'Floor',
              placeholder: 'Floor',
              required: 'Floor is required!',
            },
            phoneNumber: {
              type: 'text',
              label: 'Phone Number',
              placeholder: 'Phone Number',
              required: 'Phone Number is required!',
            },
            name: {
              type: 'text',
              label: 'Name',
              placeholder: 'Name',
              required: 'Name is required!',
            },
          }}
          onSubmit={(data) => {
            formSubmittedEvent({
              ...data,
              floor: Number(data.floor),
              cartId: cart.id,
            });
            return Promise.resolve('');
          }}
          isPending={isCreating}
          submitButtonVariant="CTA"
          submitText="Create Order"
        />
      </Paper>
    </Container>
  );
};

export default PrivatePage(CreateOrderPage, [SessionUserRole.CUSTOMER]);
