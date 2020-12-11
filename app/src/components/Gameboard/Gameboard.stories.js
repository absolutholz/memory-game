import Gameboard from '.';

export default {
	title: 'Gameboard/Gameboard',
	component: Gameboard,
};

const Template = (args, { argTypes }) => ({
	components: { Gameboard },
	props: Object.keys(argTypes),
	template: `
		<gameboard />
	`,
});

export const Default = Template.bind({});
