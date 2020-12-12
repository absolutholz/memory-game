import GameboardCards from '.';
import { action } from '@storybook/addon-actions';
import Card from '../../js/Card';

// import shuffle from './../../js/array-shuffle';

export default {
	title: 'Gameboard/Gameboard Cards',
	component: GameboardCards,
};

const actionsData = {
  onMatch: action('match'),
  onNonMatch: action('non-match'),
};

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

const Template = (args, { argTypes }) => ({
	components: { GameboardCards },
	props: Object.keys(argTypes),
	methods: actionsData,
	template:  `
		<div style="background:rgba(255, 0, 0, 0.25); height: 500px; overflow: hidden;">
			<gameboard-cards v-bind="$props" @match="onMatch" @non-match="onNonMatch" />
		</div>
	`,
});

export const Default = Template.bind({});
Default.args = {
	cards: cards,
};
