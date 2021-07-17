import type { IncomingMessage } from 'node:http';

/** Reads the request body as JSON. */
function readBodyAsJSON<T = unknown>(request: IncomingMessage): Promise<T> {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  return new Promise((resolve) => {
    request.on('end', () => {
      resolve(JSON.parse(body));
    });
  });
}

export default readBodyAsJSON;
