import { BaseViewModel, TypeName } from '@mail/common';

import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export interface HttpClient {
  sendRequest: <TViewModel extends BaseViewModel>(config: AxiosRequestConfig) => Promise<AxiosResponse<TViewModel, any>>
}

export const getHttpClient = (token: string, typeName: TypeName): HttpClient => {
  const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/api/${typeName}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const sendRequest = async <TViewModel extends BaseViewModel>(config: AxiosRequestConfig) => await axiosInstance.request<TViewModel>(config);

  return { 
    sendRequest 
  };
}