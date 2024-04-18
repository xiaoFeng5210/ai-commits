import { cli } from 'cleye'
import { confirm, text, intro, outro} from '@clack/prompts';
import os from 'node:os';
import aicommits from "./commands/aicommits";

// const cups = os.cpus().length;


// Parse argv
const argv = cli({
	name: 'cli.ts',

	// Define parameters
	// parameters: [
	// ],

	// 里面定义--options 参数
	flags: {  
		// Parses `--time` as a string
	}
})

intro('开始进行AI分析')
aicommits();






