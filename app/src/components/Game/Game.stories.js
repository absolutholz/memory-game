import Game from '.';
import Player from './../../js/Player';
// import { action } from '@storybook/addon-actions';
import theme from './../../configs/numbers';

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
	cardCount: 20,
	images: theme.images,
	imagesType: theme.type,
	players: [ player1, player2 ],
	theme: {
		type: 'image',
		image: {
			src: '/apple-touch-icon-152x152.png',
		},
	},
};
