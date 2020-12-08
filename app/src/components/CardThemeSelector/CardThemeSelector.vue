<template>
	<ul class="game-theme-list">
		<li v-for="(theme, index) in themes" :key="index">
			<input class="game-theme-list__input"
				v-model="selection"
				@change="select(theme)"
				:id="`game-theme-${ theme.id }`"
				name="game-theme"
				type="radio"
				:value="theme"
			/>
			<label class="game-theme-list__label" :for="`game-theme-${ theme.id }`">
				<card :aria-label="theme.name" :elevated="selection === theme">
					<card-image :src="theme.cover.image.src" :type="theme.cover.type" />
				</card>
			</label>
		</li>
	</ul>

</template>

<script>
import Card from './../Card';
import CardImage from './../CardImage';

import configShapes from './../../configs/shapes';
import configLetters from './../../configs/letters';
import configNumbers from './../../configs/numbers';
import configLegoFigures from './../../configs/lego-figures';
import configLegoStarWarsFigures from './../../configs/lego-star-wars-figures';

export const themes =  [
	configShapes,
	configLetters,
	configNumbers,
	configLegoFigures,
	configLegoStarWarsFigures,
];

export default {
	name: 'CardThemeSelector',

	components: {
		Card,
		CardImage,
	},

	data () {
		return {
			selection: this.initialSelection,
			themes,
		};
	},

	props: {
		initialSelection: {
			required: false,
		},
	},

	methods: {
		select () {
			this.$emit('on-select', this.selection);
		},
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/layout/visually-hidden-mixins";

.game-theme-list {
	display: grid;
	grid-auto-rows: 1fr;
	grid-gap: var(--spacing-base) var(--spacing-base);
	grid-template-columns: repeat(auto-fill, minmax(clamp(15% #{"-"} var(--spacing-base), 70px, 100%), 1fr));
	list-style: none;
	margin: 0;
	padding-left: 0;

	&__input {
		@include visually-hidden();
	}

	&__label {
		display: block;
	}
}
</style>
