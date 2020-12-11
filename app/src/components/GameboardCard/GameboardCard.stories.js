import GameboardCard from '.';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Gameboard/Gameboard Card',
	component: GameboardCard,
	argTypes: {
		color: { control: 'color' },
	},
};

const actionsData = {
  onSelect: action('select'),
};

const Template = (args, { argTypes }) => ({
	components: { GameboardCard },
	props: Object.keys(argTypes),
	methods: actionsData,
	template:  `
		<div style="max-width: 250px; padding: 5vw;">
			<gameboard-card v-bind="$props" @select="onSelect" />
		</div>
	`,
});

export const Default = Template.bind({});
Default.args = {
	id: '1',
	name: '1-a',
	faceImageSrc: '/android-chrome-512x512.png',
	faceImageType: 'image',
};
