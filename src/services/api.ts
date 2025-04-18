
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/token/`, { username, password });
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  },
};

export const alerts = {
  getAll: () => api.get('/alerts/'),
  getActive: () => api.get('/alerts/active/'),
  create: (data: any) => api.post('/alerts/', data),
  update: (id: string, data: any) => api.put(`/alerts/${id}/`, data),
  delete: (id: string) => api.delete(`/alerts/${id}/`),
};

export const cameras = {
  getAll: () => api.get('/cameras/'),
  getActive: () => api.get('/cameras/active/'),
  create: (data: any) => api.post('/cameras/', data),
  update: (id: string, data: any) => api.put(`/cameras/${id}/`, data),
  delete: (id: string) => api.delete(`/cameras/${id}/`),
};

export const emergencyContacts = {
  getAll: () => api.get('/emergency-contacts/'),
  create: (data: any) => api.post('/emergency-contacts/', data),
  update: (id: string, data: any) => api.put(`/emergency-contacts/${id}/`, data),
  delete: (id: string) => api.delete(`/emergency-contacts/${id}/`),
};
