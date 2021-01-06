<template>
	<list-unstyled class="game-theme-list">
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
	</list-unstyled>
</template>

<script>
import Card from './../Card';
import CardImage from './../CardImage';
import ListUnstyled from './../ListUnstyled';

import configArt from './../../configs/art';
import configFamily from './../../configs/family';
import configFlags from './../../configs/flags';
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
	configFlags,
	configFamily,
	configArt,
];

export default {
	name: 'CardThemeSelector',

	components: {
		Card,
		CardImage,
		ListUnstyled,
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
			this.$emit('update', this.selection);
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
	margin: 0;

	&__input {
		@include visually-hidden();
	}

	&__label {
		display: block;
	}

	.card {
		--on-surface: var(--primary);
	}
}
</style>
