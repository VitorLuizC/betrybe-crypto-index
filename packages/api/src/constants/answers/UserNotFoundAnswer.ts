import Answer from '@betrybe-crypto-index/answer';

export const UserNotFoundAnswer = new Answer()
  .withStatusCode(404)
  .withStatusMessage('Not found')
  .withJSONBody({ message: 'Usuário não encontrado.' });

export default UserNotFoundAnswer;
