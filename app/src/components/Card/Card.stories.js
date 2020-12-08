import Card from '.';

export default {
	title: 'Card',
};

export const standard = () => ({
	components: { Card },
	template: `
		<div style="max-width: 250px; padding: 5vw;">
			<card />
		</div>
	`,
});

export const elevated = () => ({
	components: { Card },
	template: `
		<div style="max-width: 250px; padding: 5vw;">
			<card :elevated="true" />
		</div>
	`,
});
