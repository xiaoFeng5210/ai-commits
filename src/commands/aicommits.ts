import {allStagedFiles2Message, getFilesChangedInGitAdd} from "../utils/help"
import { confirm, text, intro, outro, spinner} from '@clack/prompts';
import { black, dim, green, red, bgCyan, bgMagenta } from 'kolorist';
import {createChatCompletion} from "../utils/openai"
import fs from "node:fs"
export default async () => {
	intro(bgCyan('-- 开始读取缓存区文件更改'))
	const files = getFilesChangedInGitAdd()
	const staged = []
	for (const file of files) {
		if (file) {
			const fileContent = fs.readFileSync(file, { encoding: "utf-8" });
			staged.push({
				filename: file,
				content: fileContent
			})
		}
	}
  // 我们可以拿到staged的内容, 需要一个判断是否为空的逻辑
	if (!staged || staged.length === 0) {
		throw new Error('No files in staged')
	}
	let s = spinner();
	s.start(bgMagenta('AI is analyzing your changes'));
	const content = allStagedFiles2Message(staged);
	const message = await createChatCompletion(content, {locale: "zh-CN", maxLength: 200}).catch(err => {
		console.log(err)
		process.exit(1)
	})
	const messageParse = JSON.parse(message)
	if (messageParse?.choices?.length === 0) {
		throw new Error(messageParse)
	}
	const commitMessage = JSON.parse(message).choices[0].message.content
	s.stop()
	outro(dim(commitMessage))
}