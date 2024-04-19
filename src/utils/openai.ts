import https from "https"
import type { ClientRequest, IncomingMessage } from 'http';
import type {
	CreateChatCompletionRequest,
	CreateChatCompletionResponse,
} from 'openai';
import {getOpenAIkey} from "./help";

let OPENAI_API_KEY;

const callOpenAI = async (json: CreateChatCompletionRequest) => {
  	new Promise((resolve, reject) => {
			const postBody = JSON.stringify(json)
			const request = https.request({
				port: 443,
				host: 'api.openai.com',
				path: '/v1/chat/completions',
				method: 'POST',
				timeout: 20000,
				headers: {
					Authorization: `Bearer ${OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				}
			},
			response => {
				const res: Buffer[] = []
				response.on('data', chunk => res.push(chunk))
				response.on('end', () => {
					console.log(Buffer.concat(res).toString())
					resolve({
						request,
						data: Buffer.concat(res).toString()
					})
				})
			}
			)
		  
		  request.on('error', reject)
		  request.on('timeout', () => {
			  request.destroy();
				reject(new Error(`Request timeout`))
		  })
		  request.write(postBody)
		  request.end()
	  })
}

const createChatCompletion = async () => {
	OPENAI_API_KEY = getOpenAIkey()
	console.log(OPENAI_API_KEY)
	if (!OPENAI_API_KEY) {
		throw new Error('No OpenAI API key found');
	}
	// TODO: prompt 信息先随机一个
	const json: CreateChatCompletionRequest = {
		model: 'gpt-3.5-turbo',
		// model: 'gpt-4-1106-preview',
		messages: [
			{ role: 'system', content: 'You are a helpful assistant.' },
			{ role: 'user', content: '我想知道幸福的生活是什么样的' },
		],
		temperature: 0.7,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: 200,
		stream: false,
		// 建议的答案数量
		n: 1,
	};
	
	const res = await callOpenAI(json)
}

createChatCompletion()