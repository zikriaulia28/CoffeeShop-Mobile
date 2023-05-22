/* eslint-disable prettier/prettier */
import axios from 'axios';
import Config from 'react-native-config';
import mime from 'mime';

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


export const deleteProduct = (token, id, controller) => {
  const url = `${baseUrl}/products/${id}`;
  return axios.delete(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const createProduct = (token, name, price, image, category_id, delivery_info, description, controller) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('category_id', category_id);
  formData.append('delivery_info', delivery_info);
  formData.append('description', description);
  if (image) {
    const imgObject = {
      uri: image.path,
      name: image.path.split('/').pop(),
      type: mime.getType(image.path),
    };
    formData.append('image', imgObject);
  }
  const url = `${baseUrl}/products`;
  const config = {
    signal: controller.signal,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post(url, formData, config);
};

export const updateProduct = (token, id, name, price, image, delivery_info, description, controller) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('delivery_info', delivery_info);
  formData.append('description', description);
  if (image) {
    const imgObject = {
      uri: image.path,
      name: image.path.split('/').pop(),
      type: mime.getType(image.path),
    };
    formData.append('image', imgObject);
  }
  const url = `${baseUrl}/products/${id}`;
  const config = {
    signal: controller.signal,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.patch(url, formData, config);
};

export const getPromo = controller => {
  const url = `${baseUrl}/promo`;
  return axios.get(url, { signal: controller.signal });
};

export const addPromo = (token, body, controller) => {
  const url = `${baseUrl}/promo`;
  return axios.post(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const editingPromo = (token, id, body, controller) => {
  const url = `${baseUrl}/promo/${id}`;
  return axios.patch(url, body, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deletingPromo = (token, id, controller) => {
  const url = `${baseUrl}/promo/${id}`;
  return axios.delete(url, {
    signal: controller.signal,
    headers: { Authorization: `Bearer ${token}` },
  });
};
