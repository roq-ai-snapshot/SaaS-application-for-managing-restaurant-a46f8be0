import axios from 'axios';
import { OrdersInterface } from 'interfaces/orders';

export const getOrders = async () => {
  const response = await axios.get(`/api/orders`);
  return response.data;
};

export const createOrders = async (orders: OrdersInterface) => {
  const response = await axios.post('/api/orders', orders);
  return response.data;
};

export const updateOrdersById = async (id: string, orders: OrdersInterface) => {
  const response = await axios.put(`/api/orders/${id}`, orders);
  return response.data;
};

export const getOrdersById = async (id: string) => {
  const response = await axios.get(`/api/orders/${id}`);
  return response.data;
};
