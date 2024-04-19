import {getFilesChangedInGitAdd} from "../utils/help"
import { confirm, text, intro, outro, spinner} from '@clack/prompts';
import { black, dim, green, red, bgCyan, bgMagenta } from 'kolorist';
import fs from "node:fs"

export default async () => {
	intro(bgCyan('-- 开始读取缓存区文件更改'))
	console.time('读缓存区文件')
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
	
  // 我们可以拿到staged的内容
	console.timeEnd('读缓存区文件')
	
	if (!staged) {
		throw new Error('No files staged')
	}
	
	let s = spinner();
	s.start(bgMagenta('AI is analyzing your changes'));
	
}