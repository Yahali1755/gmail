import { TypeName } from '@mail/common';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpClient {
  sendRequest: <TRequestData, TResponse>(config: AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>
}

export const getHttpClient = (token: string, typeName: TypeName): HttpClient => {
  const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/api/${typeName}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const sendRequest = async <TRequestData, TResponse>(config: AxiosRequestConfig) => await axiosInstance.request<TRequestData, TResponse>(config);

  return { 
    sendRequest 
  };
}