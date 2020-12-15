import ResultsPlayerVictorius from '.';

import Card from './../../js/Card';
import Player from './../../js/Player';

const colors = [
	'firebrick',
	'forestgreen',
	'rebeccapurple',
	'dodgerblue',
	'coral',
];

const cards = [];
for (let i = 0; i < 5; i += 1) {
	const card1 = new Card(`${i}-a`, `${i}`);
	card1.faceImage.src = `${i}`;
	card1.faceImage.type = 'text';
	card1.color = colors[i];

	const card2 = new Card(`${i}-b`, `${i}`);
	card2.faceImage.src = `${i}`;
	card2.faceImage.type = 'text';
	card1.color = colors[i];

	cards.push(card1);
	cards.push(card2);
}

const player = new Player('1', 'Player 1');
player.cards = cards;

export default {
	title: 'Results/Player Victorius',
	component: ResultsPlayerVictorius,
};

const Template = (args, { argTypes }) => ({
	components: { ResultsPlayerVictorius },
	props: Object.keys(argTypes),
	template:  `
		<results-player-victorius v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	player,
};
