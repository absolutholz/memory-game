import Gameboard from '.';

export default {
	title: 'Gameboard',
};

export const Default = () => ({
	components: { Gameboard },
	template: `
		<gameboard />
	`,
});
