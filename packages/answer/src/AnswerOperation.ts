import type { ServerResponse } from 'node:http';

type AnswerOperation = (response: ServerResponse) => void;

export default AnswerOperation;
