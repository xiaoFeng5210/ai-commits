import {https} from "https"
import type { ClientRequest, IncomingMessage } from 'http';
import type {
	CreateChatCompletionRequest,
	CreateChatCompletionResponse,
} from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log('api key')