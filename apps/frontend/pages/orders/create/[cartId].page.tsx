import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import { SessionUserRole } from '@/src/shared/session';
import { paths } from '@/src/paths';

import { useUnit } from 'effector-react';
import {
  $cart,
  $isCartPending,
  $isCreating,
  formSubmitted,
  orderCreated,
  pageMounted,
} from './index.model';

import { PrivatePage } from '@/src/features/Auth';

import { Paper } from '@/src/ui/atoms/Paper';
import { H1, H2 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { NoResults } from '@/src/ui/atoms/NoResults';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Table } from '@/src/ui/molecules/Table';
import { Form, FormError } from '@/src/ui/molecules/Form';
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: '',
      city: '',
      street: '',
      house: '',
      flat: '',
      floor: 1,
      phoneNumber: '',
      name: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    formSubmittedEvent({ ...data, cartId: cart.id });
  });

  useEffect(() => {
    orderCreated.watch((order) => {
      router.push(paths.ordersPayment({ orderId: order.id }));
    });
  }, [router]);

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

        <Form className="my-4" onSubmit={onSubmit}>
          <H2>Shipping Info</H2>

          <InputField
            label="Country"
            {...register('country', { required: 'Country is required!' })}
          />
          <FormError>{errors.country?.message}</FormError>

          <InputField
            label="City"
            {...register('city', { required: 'City is required!' })}
          />
          <FormError>{errors.city?.message}</FormError>

          <InputField
            label="Street"
            {...register('street', { required: 'Street is required!' })}
          />
          <FormError>{errors.street?.message}</FormError>

          <InputField
            label="House"
            {...register('house', { required: 'House is required!' })}
          />
          <FormError>{errors.house?.message}</FormError>

          <InputField
            label="Flat"
            {...register('flat', { required: 'Flat is required!' })}
          />
          <FormError>{errors.flat?.message}</FormError>

          <InputField
            label="Floor"
            type="number"
            {...register('floor', {
              required: 'Floor is required!',
              valueAsNumber: true,
            })}
          />
          <FormError>{errors.floor?.message}</FormError>

          <InputField
            label="Phone Number"
            {...register('phoneNumber', {
              required: 'Phone Number is required!',
            })}
          />
          <FormError>{errors.phoneNumber?.message}</FormError>

          <InputField
            label="Name"
            {...register('name', { required: 'Name is required!' })}
          />
          <FormError>{errors.name?.message}</FormError>

          <CTAButton type="submit" isLoading={isCreating}>
            Create order
          </CTAButton>
        </Form>
      </Paper>
    </Container>
  );
};

export default PrivatePage(CreateOrderPage, [SessionUserRole.CUSTOMER]);
