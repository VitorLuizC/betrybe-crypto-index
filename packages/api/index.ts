import type { ServerResponse, IncomingMessage } from 'http';
import { createServer } from 'http';
import Answer from '../answer/types/Answer';
import { ServiceNotFoundAnswer } from './constants/answers';
import loginRoute from './routes/login';

async function app(request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case '/api/login':
      loginRoute(request, response);
      break;
    case '/api/crypto/btc':
      break;
    default: {
      return Answer.send(response, ServiceNotFoundAnswer);
    }
  }
}

const server = createServer(app);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
});
