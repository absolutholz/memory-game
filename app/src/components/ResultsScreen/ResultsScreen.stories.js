import ResultsScreen from '.';

import Card from './../../js/Card';
import Player from './../../js/Player';

const colors = [
	'firebrick',
	'forestgreen',
	'rebeccapurple',
	'dodgerblue',
	'coral',
]

const cards4 = [];
for (let i = 0; i < 4; i += 1) {
	const card1 = new Card(`${i}-a`, `${i}`);
	card1.faceImage.src = `${i}`;
	card1.faceImage.type = 'text';
	card1.color = colors[i];

	const card2 = new Card(`${i}-b`, `${i}`);
	card2.faceImage.src = `${i}`;
	card2.faceImage.type = 'text';
	card1.color = colors[i];

	cards4.push(card1);
	cards4.push(card2);
}

const cards3 = [];
for (let i = 0; i < 3; i += 1) {
	const card1 = new Card(`${i}-a`, `${i}`);
	card1.faceImage.src = `${i}`;
	card1.faceImage.type = 'text';
	card1.color = colors[i];

	const card2 = new Card(`${i}-b`, `${i}`);
	card2.faceImage.src = `${i}`;
	card2.faceImage.type = 'text';
	card1.color = colors[i];

	cards3.push(card1);
	cards3.push(card2);
}


const cards2 = [];
for (let i = 0; i < 2; i += 1) {
	const card1 = new Card(`${i}-a`, `${i}`);
	card1.faceImage.src = `${i}`;
	card1.faceImage.type = 'text';
	card1.color = colors[i];

	const card2 = new Card(`${i}-b`, `${i}`);
	card2.faceImage.src = `${i}`;
	card2.faceImage.type = 'text';
	card1.color = colors[i];

	cards2.push(card1);
	cards2.push(card2);
}

const player1 = new Player('1', 'Player 1');

const player2 = new Player('2', 'Player 2');

const player3 = new Player('3', 'Player 3');

const player4 = new Player('4', 'Player 4');

export default {
	title: 'Results/Results Screen',
	component: ResultsScreen,
};

const Template = (args, { argTypes }) => ({
	components: { ResultsScreen },
	props: Object.keys(argTypes),
	template:  `
		<results-screen v-bind="$props" />
	`,
});

export const SingleVictor = Template.bind({});
player1.cards = cards4;
player2.cards = cards3;
player3.cards = cards2;
SingleVictor.args = {
	players: [ player1, player2, player3, player4 ],
};

// export const TwoVictors = Template.bind({});
// player1.cards = cards4;
// player2.cards = cards4;
// player3.cards = cards2;
// TwoVictors.args = {
// 	players: [ player1, player2, player3, player4 ],
// };

// export const ThreeVictors = Template.bind({});
// player1.cards = cards4;
// player2.cards = cards4;
// player3.cards = cards4;
// ThreeVictors.args = {
// 	players: [ player1, player2, player3, player4 ],
// };

// export const FourVictors = Template.bind({});
// player1.cards = cards4;
// player2.cards = cards4;
// player3.cards = cards4;
// player4.cards = cards4;
// FourVictors.args = {
// 	players: [ player1, player2, player3, player4 ],
// };
