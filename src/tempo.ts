import axios, { AxiosRequestConfig } from 'axios';
import {
  AuthenticatedUser,
  FailedLoginResponse,
  FailedWorkoutsResponse,
  LoginCredentials,
  SuccessfulLoginResponse,
  SuccessfulWorkoutsResponse,
  TempoResponse,
  WorkoutsRequest,
} from './types';

import { UserAgent } from './user-agent';

const axiosClient = axios.create({
  baseURL: 'https://api.trainwithpivot.com/v1/',

  // Making the validateStatus function a noop so that we can set our own failure types
  validateStatus: () => true,
});

// This is just to help declutter some of the response types for the below functions
type Response<S, F> = Promise<TempoResponse<S, F>>;

export class Tempo {
  async login(
    loginCredentials: LoginCredentials,
  ): Response<SuccessfulLoginResponse, FailedLoginResponse> {
    return await this.makeRequest<SuccessfulLoginResponse, FailedLoginResponse>({
      method: 'POST',
      url: 'login',
      data: loginCredentials,
    });
  }

  async workouts(
    user: AuthenticatedUser,
    timeframe: WorkoutsRequest,
  ): Response<SuccessfulWorkoutsResponse, FailedWorkoutsResponse> {
    return await this.makeAuthenticatedRequest<SuccessfulWorkoutsResponse, FailedWorkoutsResponse>(
      user,
      {
        method: 'GET',
        url: '/me/workouts',
        params: timeframe,
      },
    );
  }

  private makeAuthenticatedRequest<S, F>(
    user: AuthenticatedUser,
    config: AxiosRequestConfig,
  ): Response<S, F> {
    config.headers = { Authorization: `Bearer ${user.token}`, 'Tempo-iOS-User-Id': user.id };

    return this.makeRequest<S, F>(config);
  }

  private async makeRequest<S, F>(config: AxiosRequestConfig): Response<S, F> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config.headers = {
      ...(config.headers || {}),
      ...{
        'User-Agent': UserAgent,
        'Content-Type': 'application/json',
      },
    };

    const response = await axiosClient.request(config);

    const wasSuccessful = !(response.status < 200 || response.status >= 300);

    if (wasSuccessful) {
      return {
        wasSuccessful,
        body: response.data as S,
      };
    }

    return {
      wasSuccessful,
      body: response.data as F,
    };
  }
}
