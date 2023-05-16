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

export const deleteTransaction = (token, transactionId, controller) => {
  const url = `${baseUrl}/transactions/${transactionId}`;
  return axios.delete(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};
