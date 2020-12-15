import Avatar from '.';

export default {
	title: 'Avatar',
	component: Avatar,
};

const Template = (args, { argTypes }) => ({
	components: { Avatar },
	props: Object.keys(argTypes),
	template:  `
		<div style="max-width: 250px;">
			<avatar v-bind="$props" />
		</div>
	`,
});

export const Default = Template.bind({});
Default.args = {
	text: 'vroni',
};
