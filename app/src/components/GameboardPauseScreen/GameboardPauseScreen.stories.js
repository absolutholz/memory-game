import GameboardPauseScreen from '.';

export default {
	title: 'Gameboard/Gameboard Pause Screen',
	component: GameboardPauseScreen,
};

const Template = (args, { argTypes }) => ({
	components: { GameboardPauseScreen },
	props: Object.keys(argTypes),
	template:  `
		<gameboard-pause-screen v-bind="$props" />
	`,
});

export const Default = Template.bind({});
