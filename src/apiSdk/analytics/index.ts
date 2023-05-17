import axios from 'axios';
import { AnalyticsInterface } from 'interfaces/analytics';

export const getAnalytics = async () => {
  const response = await axios.get(`/api/analytics`);
  return response.data;
};

export const createAnalytics = async (analytics: AnalyticsInterface) => {
  const response = await axios.post('/api/analytics', analytics);
  return response.data;
};

export const updateAnalyticsById = async (id: string, analytics: AnalyticsInterface) => {
  const response = await axios.put(`/api/analytics/${id}`, analytics);
  return response.data;
};

export const getAnalyticsById = async (id: string) => {
  const response = await axios.get(`/api/analytics/${id}`);
  return response.data;
};
