import ResultsPlayersNonVictorius from '.';

import Card from './../../js/Card';
import Player from './../../js/Player';

const colors = [
	'firebrick',
	'forestgreen',
	'rebeccapurple',
	'dodgerblue',
	'coral',
]

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

const player1 = new Player('1', 'Player 1');
player1.cards = cards;

const player2 = new Player('2', 'Player 2');
player2.cards = cards;

const player3 = new Player('3', 'Player 3');
player3.cards = cards;

const player4 = new Player('4', 'Player 4');
player4.cards = cards;

export default {
	title: 'Results/Players Non-Victorius',
	component: ResultsPlayersNonVictorius,
};

const Template = (args, { argTypes }) => ({
	components: { ResultsPlayersNonVictorius },
	props: Object.keys(argTypes),
	template:  `
		<results-players-non-victorius v-bind="$props" />
	`,
});

export const SinglePlayer = Template.bind({});
SinglePlayer.args = {
	players: [ player1 ],
};

export const TwoPlayer = Template.bind({});
TwoPlayer.args = {
	players: [ player1, player2 ],
};

export const ThreePlayer = Template.bind({});
ThreePlayer.args = {
	players: [ player1,player2, player3 ],
};

export const FourPlayer = Template.bind({});
FourPlayer.args = {
	players: [ player1, player2, player3, player4 ],
};
