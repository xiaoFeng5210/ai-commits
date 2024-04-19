import https from "https"
import type { ClientRequest, IncomingMessage } from 'http';
import CreateChatCompletionRequestMessage from "openai"
import {createChatRequest} from "./prompt";
import {getOpenAIkey} from "./help";

let OPENAI_API_KEY;

const callOpenAI = async (json: CreateChatCompletionRequestMessage) => {
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

/**
 * 
 * @param options {diff: string}
 */
const createChatCompletion = async (options: {diff: string}) => {
	OPENAI_API_KEY = getOpenAIkey()
	const {diff} = options
	console.log(OPENAI_API_KEY)
	if (!OPENAI_API_KEY) {
		throw new Error('No OpenAI API key found');
	}
	// TODO: prompt 信息先随机一个
	const json: CreateChatCompletionRequestMessage = createChatRequest(diff) as any
	const res = await callOpenAI(json)
}

const diff = "你好，我想知道怎么写一个关于分析要提交代码的prompt"
createChatCompletion({diff})