import axios from 'axios';
const API_URL = import.meta.env.VITE_LOCAL_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const login = async (token?: string) => {
  return await api.post('/users/sign-in', {
    token,
  });
};

export const createStoryApi = async (data: any, token: string) => {
  return await api.post(
    '/story/create',
    {
      ...data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
