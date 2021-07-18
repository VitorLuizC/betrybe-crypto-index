import Answer from '../../../answer/types/Answer';

const ServiceNotFound = new Answer()
  .withStatusCode(404)
  .withStatusMessage('Service not found')
  .withJSONBody({
    message: 'Endpoint não encontrado',
  });

export default ServiceNotFound;
