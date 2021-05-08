import { Tempo } from '../src';
import { WorkoutsRequest } from '../src/types/workouts';

test('Login works with correct password', async () => {
  const USERNAME = process.env.TEMPO_USERNAME || '';
  const PASSWORD = process.env.TEMPO_PASSWORD || '';

  const tempo = new Tempo();
  const response = await tempo.login({ email: USERNAME, password: PASSWORD });

  expect(response.body).toHaveProperty('data');
  expect(response.wasSuccessful).toBeTruthy();
});

test('Login fails with bad password', async () => {
  const USERNAME = process.env.TEMPO_USERNAME || '';
  const PASSWORD = 'bad-password';

  const tempo = new Tempo();
  const response = await tempo.login({ email: USERNAME, password: PASSWORD });

  expect(response.wasSuccessful).toBeFalsy();
  expect(response.body).toHaveProperty('errors');
});

test('Getting workouts works', async () => {
  const USERNAME = process.env.TEMPO_USERNAME || '';
  const PASSWORD = process.env.TEMPO_PASSWORD || '';

  const tempo = new Tempo();
  const loggedInResponse = await tempo.login({ email: USERNAME, password: PASSWORD });

  if (!loggedInResponse.wasSuccessful) {
    throw new Error('Not logged in, test failed');
  }

  const user = {
    id: loggedInResponse.body.data.id,
    token: loggedInResponse.body.data.token,
  };

  const timeframe: WorkoutsRequest = {
    start_time: new Date('2021/04/01').toISOString(),
    end_time: new Date('2021/05/01').toISOString(),
  };

  const workouts = await tempo.workouts(user, timeframe);

  expect(workouts.wasSuccessful).toBeTruthy();
  expect(workouts.body).toHaveProperty('data');
});
