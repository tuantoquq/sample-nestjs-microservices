import { ping } from 'tcp-ping';

describe('Health Checks', () => {
  test('Reservations', async () => {
    const response = await fetch('http://reservations:3000', {
      method: 'GET',
    });
    expect(response.ok).toBe(true);
  });

  test('Auth', async () => {
    const response = await fetch('http://auth:3001', {
      method: 'GET',
    });
    expect(response.ok).toBe(true);
  });

  test('Payments', (done) => {
    ping(
      {
        address: 'payments',
        port: 3003,
      },
      (err) => {
        if (err) {
          fail(err);
        }
        done();
      },
    );
  });

  test('Notification', (done) => {
    ping(
      {
        address: '3004',
        port: 3003,
      },
      (err) => {
        if (err) {
          fail(err);
        }
        done();
      },
    );
  });
});
