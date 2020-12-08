import TimeDisplay from '.';

export default {
	title: 'Time Display',
};

export const standard = () => ({
	components: { TimeDisplay },
	template: `
		<time-display :seconds="99" />
	`,
});
