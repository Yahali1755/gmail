import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getHttpClient = (token: string) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const sendRequest = async (config: AxiosRequestConfig) => await axiosInstance.request(config);

  return { 
    sendRequest 
  };
}