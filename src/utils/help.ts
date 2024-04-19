import {execSync} from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = fileURLToPath(import.meta.url);
/**
 * Check if a file has changed in the git index
 * @param path
 */
export function getFilesChangedInGitAdd() {
	const gitDiff = execSync("git diff --cached --name-only", { encoding: "utf-8" });
	return gitDiff.split("\n")
}

export function getOpenAIkey() {
	const filePath = path.join(__dirname, "..", "..", "..", ".env")
	const content = fs.readFileSync(filePath, { encoding: "utf-8" });
	return content.split("=")[1].replace("\n", "")
}