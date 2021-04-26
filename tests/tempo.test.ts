import { Tempo } from '../src';
import { AuthenticatedUser } from '../src/types/login';
import { WorkoutsRequest } from '../src/types/workouts';

test('Login works with correct password', async () => {
  const USERNAME = process.env.TEMPO_USERNAME || '';
  const PASSWORD = process.env.TEMPO_PASSWORD || '';

  const tempo = new Tempo();
  const response = await tempo.login({ email: USERNAME, password: PASSWORD });

  expect(response).toHaveProperty('data');
  expect(response.wasSuccessful).toBeTruthy();
});

test('Login fails with bad password', async () => {
  const USERNAME = process.env.TEMPO_USERNAME || '';
  const PASSWORD = 'bad-password';

  const tempo = new Tempo();
  const response = await tempo.login({ email: USERNAME, password: PASSWORD });

  expect(response.wasSuccessful).toBeFalsy();
  expect(response).toHaveProperty('errors');
});

test('Getting workouts works', async () => {
  const user: AuthenticatedUser = {
    id: process.env.TEMPO_USER_ID || '',
    token: process.env.TEMPO_USER_TOKEN || '',
  };

  const timeframe: WorkoutsRequest = {
    start_time: new Date('2021/04/01').toISOString(),
    end_time: new Date('2021/05/01').toISOString(),
  };

  const tempo = new Tempo();
  const response = await tempo.workouts(user, timeframe);

  expect(response.wasSuccessful).toBeTruthy();
  expect(response).toHaveProperty('data');
});
