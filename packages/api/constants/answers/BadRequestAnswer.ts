import Answer from '../../../answer/types/Answer';

export const BadRequestAnswer = new Answer()
  .withStatusCode(400)
  .withStatusMessage('Bad Request')
  .withJSONBody({ message: 'Campos inválidos' });

export default BadRequestAnswer;
