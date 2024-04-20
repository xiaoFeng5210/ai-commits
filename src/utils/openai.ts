import https from "https"
import type { ClientRequest, IncomingMessage } from 'http';
import CreateChatCompletionRequestMessage from "openai"
import {createChatRequest} from "./prompt";
import {getOpenAIkey} from "./help";

let OPENAI_API_KEY;

const callOpenAI = async (json: CreateChatCompletionRequestMessage): Promise<{data: string, request: ClientRequest, response: IncomingMessage}> => {
  	return new Promise((resolve, reject) => {
			const postBody = JSON.stringify(json)
			const request = https.request({
				port: 443,
				host: 'api.openai.com',
				path: '/v1/chat/completions',
				method: 'POST',
				timeout: 20000,  // 20 seconds 为了让接口有充足的时间把内容返回
				headers: {
					Authorization: `Bearer ${OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				}
			},
			response => {
				const res: Buffer[] = []
				response.on('data', chunk => res.push(chunk))
				response.on('end', () => {
					resolve({
						request,
						response,
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
 * @param diff {string}
 * @param options {{locale: string, maxLength: number}}
 */
export const createChatCompletion = async (diff: string, options: {locale: string, maxLength: number}) => {
	OPENAI_API_KEY = getOpenAIkey()
	const {locale, maxLength} = options
	if (!OPENAI_API_KEY) {
		throw new Error('No OpenAI API key found');
	}
	// TODO: prompt 信息先随机一个
	const json: CreateChatCompletionRequestMessage = createChatRequest(diff, {locale, maxLength}) as any
	const res = await callOpenAI(json).catch(err => {
		throw new Error(`Failed to call OpenAI: ${err}`)
	})
	
	return res.data
}