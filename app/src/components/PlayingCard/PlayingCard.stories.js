import PlayingCard from '.';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Playing Card',
	component: PlayingCard,
	argTypes: {
		color: { control: 'color' },
	},
};

const actionsData = {
  onSelect: action('select'),
};

const Template = (args, { argTypes }) => ({
	components: { PlayingCard },
	props: Object.keys(argTypes),
	methods: actionsData,
	template:  `
		<div style="max-width: 250px; padding: 5vw;">
			<playing-card v-bind="$props" @select="onSelect" />
		</div>
	`,
});

export const Default = Template.bind({});

// Default.args = {
// 	task: {
// 		id: '1',
// 		title: 'Test Task',
// 		state: 'TASK_INBOX',
// 		updatedAt: new Date(2018, 0, 1, 9, 0),
// 	},
// };

// export const Pinned = Template.bind({});
// Pinned.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_PINNED',
//   },
// };

// export const Archived = Template.bind({});
// Archived.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_ARCHIVED',
//   },
// };
