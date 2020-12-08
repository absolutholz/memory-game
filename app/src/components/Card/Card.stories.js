import Card from '.';

export default {
	title: 'Card',
};

export const standard = () => ({
	components: { Card },
	template: `
		<div style="max-width: 250px; padding: 5vw;">
			<card style="padding-bottom: 100%;" />
		</div>
	`,
});

export const elevated = () => ({
	components: { Card },
	template: `
		<div style="max-width: 250px; padding: 5vw;">
			<card :elevated="true" style="padding-bottom: 100%;" />
		</div>
	`,
});
