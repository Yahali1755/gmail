import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TypeName } from '@mail/common';

import { transformResponse } from './transform';

export interface HttpClient {
  sendRequest: <TResponse>(config: AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>
}

export const getHttpClient = (token: string, typeName: TypeName): HttpClient => {
  const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/api/${typeName}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    transformResponse
  });

  const sendRequest = async <TResponse>(config: AxiosRequestConfig) => await axiosInstance.request<TResponse>(config);

  return { 
    sendRequest 
  };
}