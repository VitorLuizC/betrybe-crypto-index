import Answer from '@betrybe-crypto-index/answer';

export const InternalServerErrorAnswer = new Answer()
  .withStatusCode(500)
  .withStatusMessage('Internal Server Error');

export default InternalServerErrorAnswer;
