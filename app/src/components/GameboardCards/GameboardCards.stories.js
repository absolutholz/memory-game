import GameboardCards from '.';
import { action } from '@storybook/addon-actions';

// import shuffle from './../../array-shuffle';

export default {
	title: 'Gameboard/Gameboard Cards',
	component: GameboardCards,
};

const actionsData = {
  onMatch: action('match'),
  onNonMatch: action('non-match'),
};

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

const cards = [];
for (let i = 0; i < 10; i += 1) {
	cards.push({
		id: `${i}-a`,
		name: `${i}`,
		backImageSrc: `${i}`,
		backImageType: 'text',
		faceImageSrc: `${i}`,
		faceImageType: 'text',
	});
	cards.push({
		id: `${i}-b`,
		name: `${i}`,
		backImageSrc: `${i}`,
		backImageType: 'text',
		faceImageSrc: `${i}`,
		faceImageType: 'text',
	});
}

export const Default = Template.bind({});
Default.args = {
	cards: cards,
	// cards: shuffle(cards),
};
