import type { ServerResponse } from 'node:http';
import type AnswerOperation from './AnswerOperation';

class Answer {
  #operations: AnswerOperation[];

  constructor() {
    this.#operations = [];
  }

  withStatusCode(code: number): this {
    this.#operations.push((response) => {
      response.statusCode = code;
    });

    return this;
  }

  withStatusMessage(message: string): this {
    this.#operations.push((response) => {
      response.statusMessage = message;
    });

    return this;
  }

  withJSONBody(body: unknown): this {
    this.withContentType('application/json');

    this.#operations.push((response) => {
      response.write(JSON.stringify(body));
    });

    return this;
  }

  withContentType(type: string): this {
    this.#operations.push((response) => {
      response.setHeader('Content-Type', type);
    });

    return this;
  }

  apply(response: ServerResponse): void {
    this.#operations.forEach((operation) => {
      operation(response);
    });
  }

  static send(response: ServerResponse, answer: Answer): void {
    answer.apply(response);
    response.end();
  }
}

export default Answer;
