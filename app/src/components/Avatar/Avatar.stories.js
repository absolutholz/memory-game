import Avatar, { ICONS } from '.';

export default {
	title: 'Avatar',
	component: Avatar,
	argTypes: {
		symbol: {
			control: {
				type: 'select',
				options: ICONS,
			},
		},
	},
};

const Template = (args, { argTypes }) => ({
	components: { Avatar },
	props: Object.keys(argTypes),
	template:  `
		<avatar v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	text: 'vroni',
};
