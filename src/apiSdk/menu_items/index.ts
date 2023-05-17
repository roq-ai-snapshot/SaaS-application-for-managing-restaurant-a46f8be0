import axios from 'axios';
import { Menu_itemsInterface } from 'interfaces/menu_items';

export const getMenu_items = async () => {
  const response = await axios.get(`/api/menu-items`);
  return response.data;
};

export const createMenu_items = async (menu_items: Menu_itemsInterface) => {
  const response = await axios.post('/api/menu-items', menu_items);
  return response.data;
};

export const updateMenu_itemsById = async (id: string, menu_items: Menu_itemsInterface) => {
  const response = await axios.put(`/api/menu-items/${id}`, menu_items);
  return response.data;
};

export const getMenu_itemsById = async (id: string) => {
  const response = await axios.get(`/api/menu-items/${id}`);
  return response.data;
};
