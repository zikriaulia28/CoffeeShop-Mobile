/* eslint-disable prettier/prettier */
import axios from 'axios';

// const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;
const baseUrl = 'https://webcoffee-api.vercel.app';

export const login = (email, password, controller) => {
  const body = {
    email,
    password,
  };
  const url = `${baseUrl}/auth`;
  const config = controller ? { signal: controller.signal } : {};
  return axios.post(url, body, config);
};
