import GameboardStatus from '.';

export default {
	title: 'Gameboard/Gameboard Status',
	component: GameboardStatus,
};

const Template = (args, { argTypes }) => ({
	components: { GameboardStatus },
	props: Object.keys(argTypes),
	template:  `
		<gameboard-status v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	secondsPlayed: 97,
	roundCount: 10,
};
