/* eslint-disable prettier/prettier */
import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.SERVER_HOST;

export const getUser = (id, controller) => {
  const url = `${baseUrl}/users/${id}`;
  return axios.get(url, {
    signal: controller.signal,
  });
};
