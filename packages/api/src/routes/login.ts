import jwt from 'jsonwebtoken';
import readDatabase from '../services/readDatabase';
import parseAuthenticationParameters from '../authentication/parseAuthenticationParameters';
import InvalidAuthenticationParametersError from '../authentication/InvalidAuthenticationParametersError';
import readBodyAsJSON from '../domains/request/readBodyAsJSON';
import type { ServerResponse, IncomingMessage } from 'http';
import Answer from '@betrybe-crypto-index/answer';
import {
  BadRequestAnswer,
  createTokenAnswer,
  InternalServerErrorAnswer,
  UserNotFoundAnswer,
} from '../constants/answers';

async function loginRoute(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
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

      const token = jwt.sign({ email }, process.env['AUTH_SECRET'] ?? '');

      return Answer.send(response, createTokenAnswer(token));
    } catch (error) {
      console.log(error);

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

export default loginRoute;
