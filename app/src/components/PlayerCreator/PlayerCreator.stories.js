import PlayerCreator from '.';
import Player from './../../js/Player';

const player = new Player('1');

export default {
	title: 'Player Creator',
	component: PlayerCreator,
};

const Template = (args, { argTypes }) => ({
	components: { PlayerCreator },
	props: Object.keys(argTypes),
	template:  `
		<player-creator :player="player" />
	`,
});

export const Default = Template.bind({});
Default.args = {
	player,
};
