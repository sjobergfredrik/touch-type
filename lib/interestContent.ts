export const interestContent: Record<string, string[]> = {
  music: [
    'Shake it off, shake it off!',
    'We will, we will rock you.'
  ],
  gaming: [
    'The cake is a lie.',
    'Finish him!'
  ],
  sports: [
    'He shoots, he scores!',
    'Touchdown!'
  ]
}

export function getContentByInterest(interest: string): string[] {
  return interestContent[interest] || []
}
