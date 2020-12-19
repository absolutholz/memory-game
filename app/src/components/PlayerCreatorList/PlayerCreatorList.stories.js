import PlayerCreatorList from '.';
import Player from './../../js/Player';

const player1 = new Player('1', 'Player 1');
const player2 = new Player('2', 'Player 2');
const player3 = new Player('3', 'Player 3');

export default {
	title: 'Player Creator List',
	component: PlayerCreatorList,
};

const Template = (args, { argTypes }) => ({
	components: { PlayerCreatorList },
	props: Object.keys(argTypes),
	template:  `
		<player-creator-list v-bind="$props" />
	`,
});

export const WithoutPlayers = Template.bind({});
WithoutPlayers.args = {
	players: [],
};

export const WithPlayers = Template.bind({});
WithPlayers.args = {
	players: [
		player1,
		player2,
		player3,
	],
};
