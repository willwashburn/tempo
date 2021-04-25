import axios, { AxiosRequestConfig } from 'axios';
import { LoginCredentials, LoginResponse } from './types';

const axiosClient = axios.create({
  baseURL: 'https://api.trainwithpivot.com/v1/',
  validateStatus: () => true,
});

const defaultHeaders = {
  'Content-Type': 'application/json',
  Host: 'api.trainwithpivot.com',
  'Tempo-iOS-User-Id': '',
  Accept: '*/*',
  'User-Agent':
    'Tempo/1.41.1(com.core-tech-fitness.tempo; build:2; iOS 14.4.2) Alamofire/5.4.0 com.github.willwashburn.tempo/0.0.1',
};

type TempoResponse = {
  wasSuccessful: boolean;
};

export class Tempo {
  async login(loginCredentials: LoginCredentials): Promise<LoginResponse & TempoResponse> {
    return await this.makeRequest<LoginResponse>({
      method: 'POST',
      url: 'login',
      data: loginCredentials,
    });
  }

  private async makeRequest<T>(config: AxiosRequestConfig): Promise<T & TempoResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config.headers = {
      ...(config.headers || {}),
      ...defaultHeaders,
    };

    const response = await axiosClient.request<T>(config);

    return {
      ...response.data,
      wasSuccessful: !(response.status < 200 || response.status >= 300),
    };
  }
}
