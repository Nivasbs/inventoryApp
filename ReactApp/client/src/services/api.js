import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// controller route name
export const getItems = async () => {
  const response = await api.get('/Products');
  return response.data;
};

export const createItem = async (productData) => {
  const response = await api.post('/Products', productData);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await api.delete(`/Products/${id}`);
  return response.data;
};