import PlayerCreator, { Player } from '.';

export default {
	title: 'Player Creator',
	// component: PlayerCreator,
};

export const Default = () => ({
	components: { PlayerCreator },
	template: `
			<player-creator :player="player" />
	`,
	props: {
		player: {
			default: new Player('1'),
		},
	},
});

// const Template = (args, { argTypes }) => ({
// 	components: { PlayerCreator },
// 	props: Object.keys(argTypes),
// 	template: '<player-creator v-bind="$props" />',
// });

// export const Default = Template.bind({});
// Default.args = {
// 	player: new Player('1'),
// };

// export const create = () => ({
// 	props: {
// 		player: {
// 			default: Player('1'),
// 		},
// 	},
// 	template: `
// 		<player-creator :player="${ player }" />
// 	`,
// });

// const player1 = Player(1);
// export const update = () => ({
// 	components: { PlayerCreator },
// 	template: `
// 		<player-creator />
// 	`,
// });
