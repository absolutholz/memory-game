<template>
	<figure
		class="avatar"
		:style="`--surface: ${ colorSurface }; --on-surface: ${ colorOnSurface };`"
	>
		<svg class="avatar__image" viewBox="0 0 24 24">
			<text
				fill="currentColor"
				font-size="90%"
				font-weight="bold"
				text-anchor="middle"
				dominant-baseline="central"
				x="50%"
				y="47%"
			>{{ letter }}</text>
		</svg>
	</figure>
</template>

<script>
// https://material.io/design/color/the-color-system.html
export const colors = [
	{
		surface: '#d32f2f', // red 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#C2185B', // pink 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#7B1FA2', // purple 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#4527A0', // deep purple 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#283593', // indigo 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#1565C0', // blue 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#0277BD', // light blue 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#00838F', // cyan 50 - 800
		onSurface: '#000',
	},
	{
		surface: '#00695C', // teal 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#2E7D32', // green 50 - 800
		onSurface: '#fff',
	},
	{
		surface: '#558B2F', // light green 50 - 800
		onSurface: '#000',
	},
	{
		surface: '#9E9D24', // lime 50 - 800
		onSurface: '#000',
	},
	{
		surface: '#F9A825', // yellow 50 - 800
		onSurface: '#000',
	},
	{
		surface: '#FF8F00', // amber 50 - 800
		onSurface: '#000',
	},
	{
		surface: '#EF6C00', // orange 50 - 800
		onSurface: '#000',
	},
	{
		surface: '#D84315', // deep orange 50 - 800
		onSurface: '#000',
	},
	{
		surface: '#4E342E', // brown 50 - 800
		onSurface: '#fff',
	},
];

export default {
	name: 'Avatar',

	props: {
		text: {
			required: true,
			type: String,
		},

		colorSurface: {
			default: 'var(--primary)',
			required: false,
			type: String,
		},

		colorOnSurface: {
			default: '#fff',
			required: false,
			type: String,
		},
	},

	computed: {
		letter () {
			return this.text ? this.text[0].toUpperCase() : ' ';
		},
	},
};
</script>

<style lang="scss">
.avatar {
	border-radius: 99rem;
	display: inline-flex;
	max-width: 100%;
	position: relative;

	&::before {
		content: "";
		display: block;
		padding-bottom: 100%;
	}

	&__image {
		background: var(--surface);
		border-radius: inherit;
		color: var(--on-surface);
		height: 100%;
		left: 0;
		object-fit: cover;
		position: absolute;
		top: 0;
		width: 100%;
	}

	// text {
	// 	text-shadow: 2px 2px var(--surface), 3px 3px var(--on-surface);
	// }
}
</style>
