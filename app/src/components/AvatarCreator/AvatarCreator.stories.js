import AvatarCreator from '.';

export default {
	title: 'Avatar Creator',
	component: AvatarCreator,
};

const Template = (args, { argTypes }) => ({
	components: { AvatarCreator },
	props: Object.keys(argTypes),
	template:  `
		<avatar-creator v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	text: 'Vroni',
};
