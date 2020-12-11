import GameboardCards from '.';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Gameboard/Gameboard Cards',
	component: GameboardCards,
};

const actionsData = {
  onSelect: action('select'),
};

const Template = (args, { argTypes }) => ({
	components: { GameboardCards },
	props: Object.keys(argTypes),
	methods: actionsData,
	template:  `
		<div style="background:rgba(255, 0, 0, 0.25); height: 500px; overflow: hidden;">
			<gameboard-cards v-bind="$props" @select="onSelect" />
		</div>
	`,
});

export const Default = Template.bind({});
Default.args = {
	cards: new Array(20),
};
