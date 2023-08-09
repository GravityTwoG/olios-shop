import { IOrder, OrderSchema } from '@/src/types/IOrder';
import {
  ListDTO,
  PaginationQueryDTO,
  axiosInstance,
  createListResponseSchema,
  createResponseSchema,
} from './lib';

const BASE_ROUTE = '/orders';

const OrderResponseSchema = createResponseSchema(OrderSchema);
const OrdersListResponseSchema = createListResponseSchema(OrderSchema);

export type CreateOrderDTO = {
  cartId: string;

  country: string;
  city: string;
  street: string;
  house: string;
  flat: string;
  floor: number;

  name: string;
  phoneNumber: string;
};

export const createOrder = async (dto: CreateOrderDTO): Promise<IOrder> => {
  const response = await axiosInstance.post(`${BASE_ROUTE}`, dto);

  return OrderResponseSchema.parse(response.data).data;
};

export type MakePaymentDTO = {
  orderId: string;

  cardNumber: string;
  cardDate: string;
  cardCVC: string;
  cardHolder: string;
};

export const fetchCustomersOrders = async (
  query: PaginationQueryDTO,
): Promise<ListDTO<IOrder>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return OrdersListResponseSchema.parse(response.data).data;
};

export const fetchCustomersOrder = async (orderId: string): Promise<IOrder> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/${orderId}`);

  return OrderResponseSchema.parse(response.data).data;
};

export const makePayment = async (dto: MakePaymentDTO): Promise<IOrder> => {
  const response = await axiosInstance.post(`${BASE_ROUTE}/payment`, dto);

  return OrderResponseSchema.parse(response.data).data;
};

export const fetchOrders = async (
  query: PaginationQueryDTO,
): Promise<ListDTO<IOrder>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/manager`, {
    params: query,
  });

  return OrdersListResponseSchema.parse(response.data).data;
};

export const fetchOrder = async (orderId: string): Promise<IOrder> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}/manager/${orderId}`);

  return OrderResponseSchema.parse(response.data).data;
};

export const markAsDelivered = async (orderId: string): Promise<IOrder> => {
  const response = await axiosInstance.patch(
    `${BASE_ROUTE}/manager/${orderId}/delivered`,
  );

  return OrderResponseSchema.parse(response.data).data;
};
