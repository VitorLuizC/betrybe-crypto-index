import Answer from '@betrybe-crypto-index/answer';

export const createTokenAnswer = (token: string): Answer =>
  new Answer()
    .withStatusCode(200)
    .withStatusMessage('Okay')
    .withJSONBody({ token });

export default createTokenAnswer;
