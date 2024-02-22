import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { TypeName } from '@mail/common';

export interface HttpClient {
  sendRequest: <TResponse>(config: AxiosRequestConfig) => Promise<AxiosResponse<TResponse>>
}

export const getHttpClient = (token: string, typeName: TypeName): HttpClient => {
  const axiosInstance = axios.create({
    baseURL: `/api/${typeName}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  });

  const sendRequest = async <TResponse>(config: AxiosRequestConfig) => await axiosInstance.request<TResponse>(config).then(response => response.data);

  return { 
    sendRequest 
  };
}