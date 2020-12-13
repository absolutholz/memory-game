import ResultCards from '.';
import Card from './../../js/Card';

export default {
	title: 'Result/Result Cards',
	component: ResultCards,
};

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

const Template = (args, { argTypes }) => ({
	components: { ResultCards },
	props: Object.keys(argTypes),
	template:  `
		<result-cards v-bind="$props" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	cards,
};
