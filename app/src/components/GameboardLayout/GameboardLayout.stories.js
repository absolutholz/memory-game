import GameboardLayout from '.';

export default {
	title: 'Gameboard/Gameboard Layout',
	component: GameboardLayout,
};

const Template = (args, { argTypes }) => ({
	components: { GameboardLayout },
	props: Object.keys(argTypes),
	template: `
		<gameboard-layout />
	`,
});

export const Default = Template.bind({});
