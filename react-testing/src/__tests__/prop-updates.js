import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('Rendering an invalid value shows an error message', () => {
  const {getByLabelText, debug, getByRole, rerender} = render(
    <FavoriteNumber />,
  )

  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: '10'}})

  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)

  debug()
  rerender(<FavoriteNumber max={10} />)
  debug()
})
