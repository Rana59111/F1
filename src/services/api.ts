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

// Add response interceptor to handle token expiration (401 errors)
api.interceptors.response.use(
  (response) => response, // Return the response as is if no error
  async (error) => {
    const originalRequest = error.config;

    // If the error is a 401 and the request has not been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh the token using the refresh token
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}/token/refresh/`, {
            refresh: refreshToken,
          });

          // Store the new access token
          localStorage.setItem('token', res.data.access);

          // Attach the new access token to the original request
          api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access}`;

          // Retry the original request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed', refreshError);
          // Optionally, log the user out if refresh fails
          // auth.logout();  // If you implement this in AuthContext
        }
      }
    }

    // If the error is not 401, or refresh fails, reject the promise
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (username: string, password: string) => {
    const response = await axios.post<{ access: string; refresh: string }>(
      `${API_URL}/token/`,
      { username, password }
    );
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

export default api;
