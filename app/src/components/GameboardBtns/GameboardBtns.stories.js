import GameboardBtns from '.';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Gameboard/Gameboard Btns',
	component: GameboardBtns,
};

const actionsData = {
  onEndGame: action('endGame'),
  onReconfigureGame: action('reconfigureGame'),
};

const Template = (args, { argTypes }) => ({
	components: { GameboardBtns },
	props: Object.keys(argTypes),
	methods: actionsData,
	template:  `
		<gameboard-btns v-bind="$props" @restart-game="onEndGame" @reconfigure-game="onReconfigureGame" />
	`,
});

export const Default = Template.bind({});
// Default.args = {
// 	id: '1',
// 	name: '1-a',
// 	faceImageSrc: '/android-chrome-512x512.png',
// 	faceImageType: 'image',
// };
