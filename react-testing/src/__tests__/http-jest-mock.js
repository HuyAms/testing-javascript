import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {loadGreeting} from "../api";
import {GreetingLoader} from "../greeting-loader-01-mocking";

jest.mock('../api')

test('loads greetings on click', () => {
  const {getByLabelText, getByText} = render(<GreetingLoader/>)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)

  nameInput.value = 'Marry'

  fireEvent.click(loadButton)
})
