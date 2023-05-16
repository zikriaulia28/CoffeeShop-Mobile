/* eslint-disable prettier/prettier */
import axios from 'axios';
import Config from 'react-native-config';

// const baseUrl = `${process.env.REACT_APP_SERVER_HOST}`;
// const baseUrl = 'https://webcoffee-api.vercel.app';
const baseUrl = Config.SERVER_HOST;

export const login = (email, password, controller) => {
  const body = {
    email,
    password,
  };
  const url = `${baseUrl}/auth`;
  const config = controller ? { signal: controller.signal } : {};
  return axios.post(url, body, config);
};

export const register = (email, password, phone_number, controller) => {
  const body = {
    email,
    password,
    phone_number,
  };
  const url = `${baseUrl}/auth/new`;
  const config = controller ? { signal: controller.signal } : {};
  return axios.post(url, body, config);
};

export const editPassword = (token, oldPassword, newPassword, controller) => {
  const body = {
    oldPassword,
    newPassword,
  };
  const url = `${baseUrl}/auth`;
  const config = controller ? {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  } : {};
  return axios.patch(url, body, config);
};
