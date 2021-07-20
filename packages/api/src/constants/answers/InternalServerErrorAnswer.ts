import Answer from '../../../../answer/types/Answer';

export const InternalServerErrorAnswer = new Answer()
  .withStatusCode(500)
  .withStatusMessage('Internal Server Error');

export default InternalServerErrorAnswer;
