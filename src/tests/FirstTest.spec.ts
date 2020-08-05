import { User } from '@models/User'

test('it should be ok', () => {
  const user = new User()

  user.name = 'Nasser'
  expect(user.name).toEqual('Nasser')
})
