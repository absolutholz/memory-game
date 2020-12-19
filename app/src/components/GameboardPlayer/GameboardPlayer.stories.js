import GameboardPlayer from '.';
import Player from './../../js/Player';

const player = new Player('1', 'Player 1');
player.cards = new Array(10);

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
	name: player.name,
	avatar: player.avatar,
};
