import Answer from '@betrybe-crypto-index/answer';

const ServiceNotFoundAnswer = new Answer()
  .withStatusCode(404)
  .withStatusMessage('Service not found')
  .withJSONBody({
    message: 'Endpoint não encontrado',
  });

export default ServiceNotFoundAnswer;
