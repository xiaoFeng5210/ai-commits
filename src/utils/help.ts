import {execSync} from "node:child_process";

/**
 * Check if a file has changed in the git index
 * @param path
 */
export function getFilesChangedInGitAdd() {
	const gitDiff = execSync("git diff --cached --name-only", { encoding: "utf-8" });
	return gitDiff.split("\n")
}