import CardImage from '.';

export default {
	title: 'Card Image',
};

export const fallback = () => ({
	components: { CardImage },
	template: `
		<div style="max-width: 350px;">
			<card-image />
		</div>
	`,
});

export const text = () => ({
	components: { CardImage },
	template: `
		<div style="max-width: 350px;">
			<card-image src="%" type="text" />
		</div>
	`,
});

export const SVGStack = () => ({
	components: { CardImage },
	template: `
		<div style="max-width: 350px;">
			<card-image src="/img/cards/shapes/shapes.svg#triangle" type="svg-stack" />
		</div>
	`,
});

export const pattern = () => ({
	components: { CardImage },
	template: `
		<div style="max-width: 350px;">
			<card-image src="madras" type="pattern" />
		</div>
	`,
});

export const image = () => ({
	components: { CardImage },
	template: `
		<div style="max-width: 350px;">
			<card-image src="/android-chrome-512x512.png" type="image" />
		</div>
	`,
});

export const html = () => ({
	components: { CardImage },
	template: `
		<div style="max-width: 350px;">
			<card-image src="<svg viewBox='0 0 24 24'><path fill='currentColor' d='M3 7A2 2 0 0 0 1 9V17H3V13H5V17H7V9A2 2 0 0 0 5 7H3M3 9H5V11H3M15 10.5V9A2 2 0 0 0 13 7H9V17H13A2 2 0 0 0 15 15V13.5A1.54 1.54 0 0 0 13.5 12A1.54 1.54 0 0 0 15 10.5M13 15H11V13H13V15M13 11H11V9H13M19 7A2 2 0 0 0 17 9V15A2 2 0 0 0 19 17H21A2 2 0 0 0 23 15V14H21V15H19V9H21V10H23V9A2 2 0 0 0 21 7Z' /></svg>" type="html" />
		</div>
	`,
});
