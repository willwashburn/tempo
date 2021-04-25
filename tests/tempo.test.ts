import { Tempo } from '../src';

test('Login works with correct password', async () => {
  const USERNAME = process.env.TEMPO_USERNAME || '';
  const PASSWORD = process.env.TEMPO_PASSWORD || '';

  const tempo = new Tempo();
  const response = await tempo.login({ email: USERNAME, password: PASSWORD });

  expect(response).toHaveProperty('data');
});

test('Login fails with bad password', async () => {
  const USERNAME = process.env.TEMPO_USERNAME || '';
  const PASSWORD = 'bad-password';

  const tempo = new Tempo();
  const response = await tempo.login({ email: USERNAME, password: PASSWORD });

  expect(response).toHaveProperty('errors');
});
