import { cli } from 'cleye'
import { confirm, text, intro, outro} from '@clack/prompts';

// Parse argv
const argv = cli({
	name: 'cli.ts',

	// Define parameters
	parameters: [
		'<first name>', // First name is required
		'[last name]' // Last name is optional
	],

	// 里面定义--options 参数
	flags: {  
		// Parses `--time` as a string
	}
})

intro(`Hello👋, 找我有什么事吗`);

const shouldContinue = await confirm({
	message: '张庆风你又摸鱼了，怎么了，有什么想说的吗?',
});

const meaning = await text({
	message: '那你说吧，我听着～',
	placeholder: 'Not sure',
	initialValue: '张庆风和杨诗颖要一起加油呀',
	validate(value) {
		if (value.length === 0) return `Value is required!`;
	},
});
const print = [argv._.firstName, argv._.lastName].filter(Boolean).join('和')
const loveStr = print + ' 你们要一起好好加油啊！祝福你们🎆'

if (meaning === '张庆风和杨诗颖要一起加油呀') {
	outro(loveStr);	
}


