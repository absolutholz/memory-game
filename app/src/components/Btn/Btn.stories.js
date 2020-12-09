import Btn from '.';

export default {
	title: 'Btn',
};

export const asButton = () => ({
	label: 'Text/As Button',
	components: { Btn },
	template: `
	<btn>button</btn>
	`,
});

export const asAnchor = () => ({
	label: 'Text/As Anchor',
	components: { Btn },
	template: `
		<btn href="#">anchor</btn>
	`,
});

export const containedAsButton = () => ({
	label: 'Contained/As Button',
	components: { Btn },
	template: `
	<btn variant="contained">button</btn>
	`,
});

export const containedAsAnchor = () => ({
	label: 'Contained/As Anchor',
	components: { Btn },
	template: `
		<btn href="#" variant="contained">anchor</btn>
	`,
});

export const outlinedAsButton = () => ({
	label: 'Contained/As Button',
	components: { Btn },
	template: `
	<btn variant="outlined">button</btn>
	`,
});

export const outlinedAsAnchor = () => ({
	label: 'Contained/As Anchor',
	components: { Btn },
	template: `
		<btn href="#" variant="outlined">anchor</btn>
	`,
});
