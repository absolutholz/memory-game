import Game from '.';
import Card from './../../js/Card';
import Player from './../../js/Player';
// import { action } from '@storybook/addon-actions';

export default {
	title: 'Game',
	component: Game,
};

// const actionsData = {
//   onEndGame: action('endGame'),
//   onReconfigureGame: action('reconfigureGame'),
// };

const cards = [];
for (let i = 0; i < 10; i += 1) {
	const card1 = new Card(`${i}-a`, `${i}`);
	card1.faceImage.src = `${i}`;
	card1.faceImage.type = 'text';

	const card2 = new Card(`${i}-b`, `${i}`);
	card2.faceImage.src = `${i}`;
	card2.faceImage.type = 'text';

	cards.push(card1);
	cards.push(card2);
}

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
	cards: cards,
	players: [ player1, player2 ],
	theme: {
		type: 'image',
		image: {
			src: '/apple-touch-icon-152x152.png',
		},
	},
};
