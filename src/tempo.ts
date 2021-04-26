import axios, { AxiosRequestConfig } from 'axios';
import { LoginCredentials, LoginResponse } from './types';
import { AuthenticatedUser } from './types/login';
import { WorkoutsRequest, WorkoutsResponse } from './types/workouts';
import { UserAgent } from './user-agent';

const axiosClient = axios.create({
  baseURL: 'https://api.trainwithpivot.com/v1/',
  validateStatus: () => true,
});

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

  async workouts(
    user: AuthenticatedUser,
    timeframe: WorkoutsRequest,
  ): Promise<WorkoutsResponse & TempoResponse> {
    return await this.makeAuthenticatedRequest<WorkoutsResponse>(user, {
      method: 'GET',
      url: '/me/workouts',
      params: timeframe,
    });
  }

  private makeAuthenticatedRequest<T>(
    user: AuthenticatedUser,
    config: AxiosRequestConfig,
  ): Promise<T & TempoResponse> {
    config.headers = { Authorization: `Bearer ${user.token}`, 'Tempo-iOS-User-Id': user.id };

    return this.makeRequest(config);
  }

  private async makeRequest<T>(config: AxiosRequestConfig): Promise<T & TempoResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config.headers = {
      ...(config.headers || {}),
      ...{
        'User-Agent': UserAgent,
        'Content-Type': 'application/json',
      },
    };

    const response = await axiosClient.request<T>(config);

    return {
      ...response.data,
      wasSuccessful: !(response.status < 200 || response.status >= 300),
    };
  }
}
