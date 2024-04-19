import https from "https"
import type { ClientRequest, IncomingMessage } from 'http';
import type {
	CreateChatCompletionRequest,
	CreateChatCompletionResponse,
} from 'openai';
import * as process from "node:process";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

const callOpenAI = async () => {
  	new Promise((resolve, reject) => {
			https.request({
				port: 443,
				host: 'api.openai.com',
				path: '/v1/chat/completions',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				}
			})
	  })
}

const createChatCompletion = async () => {
	console.log(OPENAI_API_KEY);
	if (!OPENAI_API_KEY) {
		throw new Error('No OpenAI API key found');
	}
	
	
	await callOpenAI()
	
}

await createChatCompletion()