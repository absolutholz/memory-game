import GameboardPlayers from '.';
import { Player } from './../PlayerCreator';

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

const player1 = new Player();
const player2 = new Player();

export const Default = Template.bind({});
Default.args = {
	players: [ player1, player2 ],
	activePlayer: player1,
};
