/* eslint-disable prettier/prettier */
import axios from 'axios';
import Config from 'react-native-config';

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

export const createOtp = (email, controller) => {
  const body = {
    email,
  };
  const url = `${baseUrl}/auth/otp`;
  const config = controller ? { signal: controller.signal } : {};
  return axios.patch(url, body, config);
};

export const forgot = (email, otp, password, controller) => {
  const body = {
    email,
    otp,
    password,
  };
  const url = `${baseUrl}/auth/forgot`;
  const config = controller ? { signal: controller.signal } : {};
  return axios.patch(url, body, config);
};

export const getNotificationFromAPI = (token) => {
  const url = `${baseUrl}/notification`;
  axios.post(url, { token: token }); // Mengirimkan token sebagai payload dalam permintaan POST
};
