/* eslint-disable prettier/prettier */
import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.SERVER_HOST;

export const getProduct = (params, controller) => {
  const url = `${baseUrl}/products?limit=${params.limit}&page=${params.page}&category=${params.category}&search=${params.search}&order=${params.order}`;
  console.log(url);
  return axios.get(url, params, {
    signal: controller.signal,
    'Access-Control-Allow-Origin': '*',
  });
};

export const getProductDetail = (id) => {
  const url = `${baseUrl}/products/${id}`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

