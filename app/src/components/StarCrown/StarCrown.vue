<template>
	<div class="star-crown">
		<svg-star class="star-crown__star star-crown__star--xs star-crown__star--left" />
		<svg-star class="star-crown__star star-crown__star--s star-crown__star--left" />
		<svg-star class="star-crown__star star-crown__star--m star-crown__star--left" />
		<svg-star class="star-crown__star star-crown__star--l" />
		<svg-star class="star-crown__star star-crown__star--m star-crown__star--right" />
		<svg-star class="star-crown__star star-crown__star--s star-crown__star--right" />
		<svg-star class="star-crown__star star-crown__star--xs star-crown__star--right" />
	</div>
</template>

<script>
import SvgStar from '@mdi/svg/svg/star.svg';

export default {
	name: 'StarCrown',

	components: {
		SvgStar,
	},
};
</script>

<style lang="scss">
.star-crown {
	align-items: flex-end;
	display: inline-flex;

	&__star {
		--rotation: 0deg;
		--direction: 1;

		color: transparent;
		filter: drop-shadow(0 0 2px rgba(0,0,0,.5));
		height: 1em;
		stroke: var(--primary);
		stroke-width: 0.125rem;
		transform: rotate(calc(var(--rotation) #{"*"} var(--direction)));
		width: 1em;

		&--l {
			font-size: 2.5rem;
		}

		&--m {
			--rotation: 15deg;

			font-size: 2rem;
			margin-bottom: -0.125rem;
		}

		&--s {
			--rotation: 30deg;

			font-size: 1.25rem;
			margin-bottom: -0.5rem;
		}

		&--xs {
			--rotation: 40deg;

			font-size: 0.75rem;
			margin-bottom: -1rem;
		}

		&--left {
			--direction: -1;
		}
	}
}
</style>
