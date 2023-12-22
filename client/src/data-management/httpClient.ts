import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getHttpClient = (token: string) => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const sendRequest = async ({method, url}: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
      return await axiosInstance.request({method, url});
    } catch (error) {
      console.error(error.stack)
    }
  };

  return { 
    sendRequest 
  };
}