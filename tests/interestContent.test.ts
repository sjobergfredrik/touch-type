import { getContentByInterest } from '../lib/interestContent'

test('returns content list', () => {
  const music = getContentByInterest('music')
  expect(Array.isArray(music)).toBe(true)
})
