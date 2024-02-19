describe('Reservations', () => {
  let jwt: string;

  const user = {
    email: 'tuantoquq@gmail.com',
    password: 'Admin123**',
  };
  beforeAll(async () => {
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    jwt = await response.text();
  });

  test('CREATE & GET a reservation', async () => {
    const createResponse = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt,
        },
        body: JSON.stringify({
          startDate: new Date('2024-02-10'),
          endDate: new Date('2024-02-20'),
          placeId: '71239sku712394',
          charge: {
            amount: 100,
            currency: 'usd',
          },
        }),
      },
    );
    expect(createResponse.ok).toBeTruthy();
    const newReservation = await createResponse.json();

    const getResponse = await fetch(
      `http://reservations:3000/reservations/${newReservation._id}`,
      {
        method: 'GET',
        headers: {
          Authorization: jwt,
        },
      },
    );
    expect(getResponse.ok).toBeTruthy();
    const reservation = await getResponse.json();
    expect(reservation).toEqual(newReservation);
  });
});
