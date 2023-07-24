import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IUserRole } from '@/src/types/IUser';
import { paths } from '@/src/paths';

import { useUnit } from 'effector-react';
import {
  $cart,
  $city,
  $country,
  $flat,
  $floor,
  $house,
  $isCartPending,
  $isCreating,
  $name,
  $phoneNumber,
  $street,
  cityChanged,
  countryChanged,
  flatChanged,
  floorChanged,
  formSubmitted,
  houseChanged,
  nameChanged,
  orderCreated,
  pageMounted,
  phoneNumberChanged,
  streetChanged,
} from './index.model';

import { PrivatePage } from '@/src/features/Auth';

import { Paper } from '@/src/ui/atoms/Paper';
import { H1, H2 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { NoResults } from '@/src/ui/atoms/NoResults';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Table } from '@/src/ui/molecules/Table';
import { Form } from '@/src/ui/molecules/Form';
import { InputField } from '@/src/ui/molecules/Field';

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

  useEffect(() => {
    if (cartId && typeof cartId === 'string') {
      pageMounted(cartId);
    }
  }, [cartId]);

  useEffect(() => {
    orderCreated.watch((order) => {
      router.push(paths.ordersPayment({ orderId: order.id }));
    });
  }, [router]);

  const [
    cart,
    isCartPending,
    country,
    city,
    street,
    house,
    flat,
    floor,
    name,
    phoneNumber,
    isCreating,
  ] = useUnit([
    $cart,
    $isCartPending,
    $country,
    $city,
    $street,
    $house,
    $flat,
    $floor,
    $name,
    $phoneNumber,
    $isCreating,
  ]);

  return (
    <Container>
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
              cartItem.realPrice,
              cartItem.sum,
            ],
          }))}
          emptyComponent={<NoResults>No products</NoResults>}
        />

        <div className="my-4 flex justify-end items-center gap-6">
          Total: {cart.total}
        </div>

        <Form className="my-4" onSubmit={() => formSubmitted()}>
          <H2>Shipping Info</H2>

          <InputField
            label="Country"
            value={country}
            onChange={(e) => countryChanged(e.target.value)}
          />
          <InputField
            label="City"
            value={city}
            onChange={(e) => cityChanged(e.target.value)}
          />
          <InputField
            label="Street"
            value={street}
            onChange={(e) => streetChanged(e.target.value)}
          />
          <InputField
            label="House"
            value={house}
            onChange={(e) => houseChanged(e.target.value)}
          />
          <InputField
            label="Flat"
            value={flat}
            onChange={(e) => flatChanged(e.target.value)}
          />
          <InputField
            label="Floor"
            type="number"
            value={floor}
            onChange={(e) => floorChanged(Number(e.target.value))}
          />

          <InputField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => phoneNumberChanged(e.target.value)}
          />
          <InputField
            label="Name"
            value={name}
            onChange={(e) => nameChanged(e.target.value)}
          />

          <CTAButton type="submit" isLoading={isCreating}>
            Create order
          </CTAButton>
        </Form>
      </Paper>
    </Container>
  );
};

export default PrivatePage(CreateOrderPage, [IUserRole.CUSTOMER]);
