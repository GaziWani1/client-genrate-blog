import axios from 'axios';
// const API_URL = import.meta.env.VITE_LOCAL_BACKEND_URL;
const API_URL = import.meta.env.VITE_SERVER_BACKEND_URL;
console.log(API_URL);

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
    '/blog/create',
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

export const getBlogs = async (
  token: string,
  search: string = '',
  page: number,
  pageLimit: number = 8
) => {
  return await api.get(
    `/blog/user-blogs?search=${search}&page=${page}&pageLimit=${pageLimit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteBlog = async (id: string, token: string) => {
  return await api.delete(`/blog/user-blog/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBlog = async (id: string) => {
  return await api.get(`/blog/user-blog/${id}`);
};

export const getCredit = async (token: string) => {
  return await api.get(`/users/credits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllBogs = async (
  search: string = '',
  page: number,
  pageLimit: number
) => {
  return await api.get(
    `/blog/get-all-blogs?search=${search}&page=${page}&pageLimit=${pageLimit}`
  );
};

export const likeBlog = async (id: string, like: boolean, token: string) => {
  const response = await api.patch(
    `/blog/like-blog/${id}?like=${like ? 1 : 0}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
