import GameboardActions from '.';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Gameboard/Gameboard Actions',
	component: GameboardActions,
};

const actionsData = {
  onEndGame: action('endGame'),
  onReconfigureGame: action('reconfigureGame'),
};

const Template = (args, { argTypes }) => ({
	components: { GameboardActions },
	props: Object.keys(argTypes),
	methods: actionsData,
	template:  `
		<gameboard-actions v-bind="$props" @restart-game="onEndGame" @reconfigure-game="onReconfigureGame" />
	`,
});

export const Default = Template.bind({});
