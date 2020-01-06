import React from 'react'
import ReactDOM from 'react-dom'
import {getQueriesForElement} from '@testing-library/dom'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)

  // const input = queries.getByLabelText(div, '/Favorite Number/i')

  const {getByLabelText} = getQueriesForElement(div)
  const input = getByLabelText(/Favorite Number/i)

  expect(input).toHaveAttribute('type', 'number')
})
