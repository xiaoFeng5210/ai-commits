/**
 * 
 * @param locale
 * @param maxLength
 */
export const generatePrompt = (locale: string, maxLength: number,) => {
	
	const basePrompt = [
		'Generate a concise git commit message written in present tense for the following code diff with the given specifications below:',
		`Message language: ${locale}`,
		`Commit message must be a maximum of ${maxLength} characters.`,
		'Exclude anything unnecessary such as translation. Your entire response will be passed directly into git commit.',
	]
}


/**
 * @params diff: string
 */
export const createChatRequest = (diff: string) => {
	return {
		model: 'gpt-3.5-turbo',
		// model: 'gpt-4-1106-preview',
		messages: [
			{ role: 'system', content: 'You are a helpful assistant.' },
			{ role: 'user', content: diff },
		],
		temperature: 0.7,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
		max_tokens: 200,
		stream: false,
		// 建议的答案数量
		n: 1,
	}
}