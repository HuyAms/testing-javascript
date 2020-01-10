import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-05-dates'
import {Redirect as MockRedirect} from 'react-router'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api')

test('render a form with title, content, tags and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()

  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)

  const fakePost = {
    title: 'Test Title',
    content: 'Test Content',
    tags: ['tag1', 'tag2'],
    date: new Date().toISOString(),
  }

  const preDate = new Date().getTime()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })

  const postDate = new Date().getTime()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  expect(mockSavePost).toHaveBeenCalledTimes(1)

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
  expect(MockRedirect).toHaveBeenCalledTimes(1)
})
