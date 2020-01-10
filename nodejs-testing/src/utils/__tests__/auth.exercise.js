// Testing Pure Functions

// 🐨 import the function that we're testing
import {isPasswordAllowed} from '../auth'
import cases from 'jest-in-case'

// 🐨 write tests for valid and invalid passwords
// 💰 here are some you can use:
//
// valid:
// - !aBc123
//
// invalid:
// - a2c! // too short
// - 123456! // no alphabet characters
// - ABCdef! // no numbers
// - abc123! // no uppercase letters
// - ABC123! // no lowercase letters
// - ABCdef123 // no non-alphanumeric characters

cases(
    'isPasswordAllowed: valid passwords',
    (options) => {
      expect(isPasswordAllowed(options.password)).toBe(true)
    },
    {
      'valid password': {
        password: '!aBc123'
      }
    }
)

cases(
    'isPasswordAllowed: invalid passwords',
    (options) => {
      expect(isPasswordAllowed(options.password)).toBe(false)
    },
    {
      'too short': {
        password: 'a2c!'
      },
      'no letters': {
        password: '123456!'
      },
      'no numbers': {
        password: 'ABCdef!'
      },
      'no uppercase letters': {
        password: 'abc123!'
      },
      'no lowercase letters': {
        password: 'ABC123!'
      },
      'no non-alphanumeric characters': {
        password: 'ABCdef123'
      }
    }
)

// describe('isPAsswordAllowed only allows some passwords', () => {
//   const allowedPasswords = ['!aBc123']
//   const disallowedPasswords = [
//       'a2c!',
//       '123456!',
//       'ABCdef!',
//       'abc123!',
//       'ABC123!',
//       'ABCdef123',
//   ]
//
//   allowedPasswords.forEach(password => {
//     test(`allows ${password}`, () => {
//       expect(isPasswordAllowed(password)).toBe(true)
//     })
//   })
//
//   disallowedPasswords.forEach(password => {
//     test(`disallows ${password}`, () => {
//       expect(isPasswordAllowed(password)).toBe(false)
//     })
//   })
// })
