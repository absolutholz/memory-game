import StarCrown from '.';

export default {
	title: 'Star Crown',
	component: StarCrown,
};

const Template = (args, { argTypes }) => ({
	components: { StarCrown },
	props: Object.keys(argTypes),
	template:  `
		<star-crown v-bind="$props" />
	`,
});

export const Default = Template.bind({});
