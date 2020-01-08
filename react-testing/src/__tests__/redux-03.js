import React from 'react'
import {Provider} from 'react-redux'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Counter} from '../redux-counter'
import {createStore} from 'redux'
import {reducer} from '../redux-reducer'

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...rtlOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    ...rtlRender(
      <Provider store={store}>
        <Counter />
      </Provider>,
      {wrappeer: Wrapper, ...rtlOptions},
    ),
    store,
  }
}

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(<Counter />)

  fireEvent.click(getByText('+'))

  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  const {getByLabelText, getByText} = render(<Counter />, {
    initialState: {count: 3},
  })

  fireEvent.click(getByText('-'))

  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
