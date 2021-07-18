import Answer from '../../../answer/types/Answer';

export const createTokenAnswer = (token: string): Answer =>
  new Answer()
    .withStatusCode(200)
    .withStatusMessage('Okay')
    .withJSONBody({ token });

export default createTokenAnswer;
