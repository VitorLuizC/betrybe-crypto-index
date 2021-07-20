import Answer from '@betrybe-crypto-index/answer';

export const BadRequestAnswer = new Answer()
  .withStatusCode(400)
  .withStatusMessage('Bad Request')
  .withJSONBody({ message: 'Campos inválidos' });

export default BadRequestAnswer;
