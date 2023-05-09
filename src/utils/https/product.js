/* eslint-disable prettier/prettier */
import axios from 'axios';
import Config from 'react-native-config';

const baseUrl = Config.SERVER_HOST;

export const getProduct = (
  // params, meta
  //   {
  //   category,
  //   limit,
  //   page,
  //   name,
  //   order,
  //   meta
  //   // search,
  // }
) => {
  // const url = `${process.env.REACT_APP_SERVER_HOST}/products?limit=${limit}&page=${page}&name=${name}&order=${order}&category=${category}`;
  const url = `${baseUrl}/products`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
