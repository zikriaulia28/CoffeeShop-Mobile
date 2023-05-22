/* eslint-disable prettier/prettier */
import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.SERVER_HOST;

export const addTransactions = (token, data, controller) => {
  const url = `${baseUrl}/transactions`;
  return axios.post(url, data, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getHistory = (token, controller) => {
  const url = `${baseUrl}/transactions`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllOrder = (token, controller) => {
  const url = `${baseUrl}/transactions/get-all-order`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getDoneOrder = (token, controller) => {
  const url = `${baseUrl}/transactions/get-done-order`;
  return axios.get(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const changeOrderDone = (token, id, controller) => {
  const url = `${baseUrl}/transactions/change-status-order/${id}`;
  console.log(url);
  return axios.patch(url, id, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTransaction = (token, id, controller) => {
  const url = `${baseUrl}/transactions/${id}`;
  return axios.delete(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};
