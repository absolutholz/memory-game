import CardThemeSelector, { themes } from '.';

export default {
	title: 'Card Theme Selector',
};

export const list = () => ({
	components: { CardThemeSelector },
	template: `
			<card-theme-selector :initialSelection="selection" />
	`,
	props: {
		selection: {
			default: themes[0],
		},
	},
});
