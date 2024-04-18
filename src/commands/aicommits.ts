import {getFilesChangedInGitAdd} from "../utils/help"
import fs from "node:fs"

export default async () => {
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
	console.log(staged)
}