import Answer from '../../../answer/types/Answer';

export const UserNotFoundAnswer = new Answer()
  .withStatusCode(404)
  .withStatusMessage('Not found')
  .withJSONBody({ message: 'Usuário não encontrado.' });

export default UserNotFoundAnswer;
