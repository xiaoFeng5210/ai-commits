import { cli } from 'cleye'
import { confirm, text, intro, outro} from '@clack/prompts';
import os from 'node:os';

const cups = os.cpus().length;
console.log(`你的电脑有${cups}个核心`)


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



