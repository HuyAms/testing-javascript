import {thumbWar} from '../index'
import {getWinner} from '../utils'

// Mock module
jest.mock('../utils', () => {
	return {
		getWinner: jest.fn((p1, p2) => p1),
	}
})

test('return winner', () => {
	const winner = thumbWar('Huy', 'Nhung')
  	expect(getWinner).toBeCalled()
  	expect(getWinner).toBeCalledWith('Huy', 'Nhung')
	expect(winner).toBe('Huy')

	// cleanup
	getWinner.mockReset()
})
