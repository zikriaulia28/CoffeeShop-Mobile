/* eslint-disable prettier/prettier */
import axios from 'axios';
import Config from 'react-native-config';
import mime from 'mime';

const baseUrl = Config.SERVER_HOST;

export const getUser = (id, controller) => {
  const url = `${baseUrl}/users/${id}`;
  return axios.get(url, {
    signal: controller.signal,
  });
};

export const updateUser = (id, token, display_name, address, birth_day, image, gender, controller) => {
  const formData = new FormData();
  formData.append('display_name', display_name);
  formData.append('address', address);
  formData.append('birth_day', birth_day);
  formData.append('gender', gender);
  if (image) {
    const imgObject = {
      uri: image.path,
      name: image.path.split('/').pop(),
      type: mime.getType(image.path),
    };
    formData.append('image', imgObject);
  }
  const url = `${baseUrl}/users/profile/${id}`;
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
