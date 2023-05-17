import axios from 'axios';
import { RestaurantsInterface } from 'interfaces/restaurants';

export const getRestaurants = async () => {
  const response = await axios.get(`/api/restaurants`);
  return response.data;
};

export const createRestaurants = async (restaurants: RestaurantsInterface) => {
  const response = await axios.post('/api/restaurants', restaurants);
  return response.data;
};

export const updateRestaurantsById = async (id: string, restaurants: RestaurantsInterface) => {
  const response = await axios.put(`/api/restaurants/${id}`, restaurants);
  return response.data;
};

export const getRestaurantsById = async (id: string) => {
  const response = await axios.get(`/api/restaurants/${id}`);
  return response.data;
};
