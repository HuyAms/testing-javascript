import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {submitForm as mockSubmitForm} from '../api'
import App from '../app'

jest.mock('../api')

test('Can fill out a form across multiple pages', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {food: 'test food', drink: 'test drink'}
  const {findByLabelText, getByText, findByText} = render(<App />)

  fireEvent.click(getByText(/fill.*form/i))

  fireEvent.change(await findByLabelText(/food/i), {
    target: {value: testData.food},
  })
  fireEvent.click(getByText(/next/i))

  fireEvent.change(await findByLabelText(/drink/i), {
    target: {value: testData.drink},
  })
  fireEvent.click(getByText(/review/i))

  expect(await findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await findByLabelText(/drink/i)).toHaveTextContent(testData.drink)

  fireEvent.click(getByText(/confirm/i, {selector: 'button'}))

  expect(mockSubmitForm).toHaveBeenCalledWith({
    drink: testData.drink,
    food: testData.food,
  })

  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  fireEvent.click(await findByText(/home/i))

  expect(getByText(/welcome home/i)).toBeInTheDocument()
})
