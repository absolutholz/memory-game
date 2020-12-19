import GameboardPlayers from '.';
import Player from './../../js/Player';

const player1 = new Player('1', 'Player 1');
player1.cards = new Array(10);
const player2 = new Player('2', 'Player 2');

export default {
	title: 'Gameboard/Gameboard Players',
	component: GameboardPlayers,
};

const Template = (args, { argTypes }) => ({
	components: { GameboardPlayers },
	props: Object.keys(argTypes),
	template:  `
		<gameboard-players v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	players: [ player1, player2 ],
	activePlayer: player1,
};
