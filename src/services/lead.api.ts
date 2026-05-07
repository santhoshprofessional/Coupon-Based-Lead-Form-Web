import axios from 'axios';

export const createLead = async (payload: any) => {
  try {
    const response = await axios.post('/api/leads', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to submit lead');
  }
};