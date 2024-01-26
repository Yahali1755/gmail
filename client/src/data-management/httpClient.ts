import { BaseViewModel, TypeName } from '@mail/common';

import axios, { AxiosRequestConfig } from 'axios';

export type HttpMethod = 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE'

export const getHttpClient = <TViewModel extends BaseViewModel>(token: string, typeName: TypeName) => {
  const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/api/${typeName}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const sendRequest = async (config: AxiosRequestConfig) => await axiosInstance.request<TViewModel>(config);

  return { 
    sendRequest 
  };
}