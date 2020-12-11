import GameboardPlayer from '.';

export default {
	title: 'Gameboard/Gameboard Player',
	component: GameboardPlayer,
};

const Template = (args, { argTypes }) => ({
	components: { GameboardPlayer },
	props: Object.keys(argTypes),
	template:  `
		<gameboard-player v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	name: 'Player 1',
};
