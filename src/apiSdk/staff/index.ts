import axios from 'axios';
import { StaffInterface } from 'interfaces/staff';

export const getStaff = async () => {
  const response = await axios.get(`/api/staff`);
  return response.data;
};

export const createStaff = async (staff: StaffInterface) => {
  const response = await axios.post('/api/staff', staff);
  return response.data;
};

export const updateStaffById = async (id: string, staff: StaffInterface) => {
  const response = await axios.put(`/api/staff/${id}`, staff);
  return response.data;
};

export const getStaffById = async (id: string) => {
  const response = await axios.get(`/api/staff/${id}`);
  return response.data;
};
