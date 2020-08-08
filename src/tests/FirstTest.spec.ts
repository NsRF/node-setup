import { Vehicle } from '@models/Vehicle';

test('it should be ok', () => {
  const user = new Vehicle();

  user.name = 'Nasser';
  expect(user.name).toEqual('Nasser');
});
