import type { ServerResponse, IncomingMessage } from 'http';
import { createServer } from 'http';
import jwt from 'jsonwebtoken';
import readDatabase from './services/readDatabase';
import parseAuthenticationParameters from './authentication/parseAuthenticationParameters';
import InvalidAuthenticationParametersError from './authentication/InvalidAuthenticationParametersError';
import readBodyAsJSON from './domains/request/readBodyAsJSON';
import Answer from '@betrybe-crypto-index/answer';

const BadRequestAnswer = new Answer()
  .withStatusCode(400)
  .withStatusMessage('Bad Request')
  .withJSONBody({ message: 'Campos inválidos' });

const InternalServerErrorAnswer = new Answer()
  .withStatusCode(500)
  .withStatusMessage('Internal Server Error');

const createTokenAnswer = (token: string) =>
  new Answer()
    .withStatusCode(200)
    .withStatusMessage('Okay')
    .withJSONBody({ token });

const UserNotFoundAnswer = new Answer()
  .withStatusCode(404)
  .withStatusMessage('Not found')
  .withJSONBody({ message: 'Usuário não encontrado.' });

async function loginRoute(request: IncomingMessage, response: ServerResponse) {
  if (request.method === 'POST') {
    try {
      const { email, password } = parseAuthenticationParameters(
        await readBodyAsJSON(request),
      );

      const database = await readDatabase();

      const person =
        database?.find(
          (record) => record.email === email && record.password === password,
        ) ?? null;

      if (!person) {
        return Answer.send(response, UserNotFoundAnswer);
      }

      const token = jwt.sign({ email }, process.env.AUTH_SECRET);

      return Answer.send(response, createTokenAnswer(token));
    } catch (error) {
      if (error instanceof InvalidAuthenticationParametersError) {
        return Answer.send(response, BadRequestAnswer);
      }
    }

    return Answer.send(response, InternalServerErrorAnswer);
  }

  return Answer.send(
    response,
    new Answer().withStatusCode(405).withStatusMessage('Method not allowed'),
  );
}

async function app(request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case '/api/login':
      loginRoute(request, response);
      break;
    // case '/api/crypto/btc':
    default: {
      return Answer.send(
        response,
        new Answer()
          .withStatusCode(404)
          .withStatusMessage('Service not found')
          .withJSONBody({
            message: 'Endpoint não encontrado',
          }),
      );
    }
  }
}

const server = createServer(app);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
});
