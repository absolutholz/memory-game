import Game from '.';
import { Player } from './../PlayerCreator';
// import { action } from '@storybook/addon-actions';

export default {
	title: 'Game',
	component: Game,
};

// const actionsData = {
//   onEndGame: action('endGame'),
//   onReconfigureGame: action('reconfigureGame'),
// };

const player1 = new Player();
const player2 = new Player();

const Template = (args, { argTypes }) => ({
	components: { Game },
	props: Object.keys(argTypes),
	// methods: actionsData,
	template:  `
		<game v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	players: [ player1, player2 ],
};
