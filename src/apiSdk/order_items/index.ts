import axios from 'axios';
import { Order_itemsInterface } from 'interfaces/order_items';

export const getOrder_items = async () => {
  const response = await axios.get(`/api/order-items`);
  return response.data;
};

export const createOrder_items = async (order_items: Order_itemsInterface) => {
  const response = await axios.post('/api/order-items', order_items);
  return response.data;
};

export const updateOrder_itemsById = async (id: string, order_items: Order_itemsInterface) => {
  const response = await axios.put(`/api/order-items/${id}`, order_items);
  return response.data;
};

export const getOrder_itemsById = async (id: string) => {
  const response = await axios.get(`/api/order-items/${id}`);
  return response.data;
};
