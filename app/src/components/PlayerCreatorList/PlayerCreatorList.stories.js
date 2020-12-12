import PlayerCreatorList from '.';
import Player from './../../js/Player';

export default {
	title: 'Player Creator List',
};

export const WithoutPlayers = () => ({
	components: { PlayerCreatorList },
	template: `
			<player-creator-list />
	`,
});

export const WithPlayers = () => ({
	components: { PlayerCreatorList },
	template: `
			<player-creator-list :players="players" />
	`,
	props: {
		players: {
			default: [
				new Player('1', 'Vroni'),
				new Player('2', 'Nicky'),
				new Player('3', 'Daddy'),
			],
		},
	},
});
