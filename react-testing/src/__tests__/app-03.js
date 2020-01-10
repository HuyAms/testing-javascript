import React from 'react'
import {render} from '@testing-library/react'
import {submitForm as mockSubmitForm} from '../api'
import user from '@testing-library/user-event'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, getByText, findByText} = render(<App />)

  user.click(getByText(/fill.*form/i))

  user.type(await findByLabelText(/food/i), testData.food)
  user.click(getByText(/next/i))

  user.type(await findByLabelText(/drink/i), testData.drink)
  user.click(getByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  user.click(getByText(/confirm/i, {selector: 'button'}))

  expect(mockSubmitForm).toHaveBeenCalledWith({
    drink: testData.drink,
    food: testData.food,
  })

  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  user.click(await findByText(/home/i))

  expect(getByText(/welcome home/i)).toBeInTheDocument()
})
