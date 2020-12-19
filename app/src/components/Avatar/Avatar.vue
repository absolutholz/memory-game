<template>
	<figure
		class="avatar"
		:style="`--surface: ${ colorSurface }; --on-surface: ${ colorOnSurface };`"
	>
		<svg
			v-if="!!symbol && symbol !== text"
			class="icon avatar__icon"
		><use :href="`/avatars.svg#${ symbol }`" /></svg>
		<span v-else>{{ transformedText }}</span>

		<figcaption>{{ text }}</figcaption>
	</figure>
</template>

<script>
// import { ICONS } from './../AvatarCreator';

export function transformText (text) {
	return text[0].toUpperCase();
}

export const ICONS = [
	'airballoon',
	'alien',
	'bug',
	'butterfly',
	'cake',
	'car',
	'cat',
	'castle',
	'cupcake',
	'dinosaur',
	'dog',
	'duck',
	'earth',
	'egg-easter',
	'elephant',
	'fish',
	'fleur-de-lis',
	'flower',
	'ghost',
	'guitar',
	'horse',
	'ice-cream',
	'kangaroo',
	'lighthouse',
	'lightning-bolt',
	'medal',
	'owl',
	'panda',
	'penguin',
	'pig',
	'pirate',
	'pine-tree',
	'rabbit',
	'rocket',
	'rodent',
	'sheep',
	'ship-wheel',
	'snail',
	'snake',
	'space-invaders',
	'sparkles',
	'spider',
	'trophy',
	'truck',
	'yin-yang',
];

export default {
	name: 'Avatar',

	props: {
		text: {
			required: true,
			type: String,
		},

		symbol: {
			required: false,
			type: String,
			validator: function (value) {
				return ICONS.indexOf(value) !== -1;
			},
		},

		colorSurface: {
			default: 'var(--primary)',
			required: false,
			type: String,
		},

		colorOnSurface: {
			default: 'var(--on-primary)',
			required: false,
			type: String,
		},
	},

	computed: {
		transformedText () {
			return this.text ? transformText(this.text) : ' '; // just to prevent storybook showing an ugly error when the control field is temporarily empty
		},
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/layout/visually-hidden-mixins";
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";

.avatar {
	align-items: center;
	background: var(--surface);
	border-radius: 9em;
	color: var(--on-surface);
	display: flex;
	font-size: 3rem;
	font-weight: $typography-weight-normal;
	justify-content: center;
	height: 2em;
	width: 2em;

	figcaption {
		@include visually-hidden();
	}

	&__icon {
		font-size: 1em;
	}
}
</style>
