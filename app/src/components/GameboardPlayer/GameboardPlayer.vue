<template>
	<section :class="`gameboard-player${ isActive ? ' gameboard-player--active' : '' }`">
		<h3 class="gameboard-player__name">{{ name }}</h3>
		<div>
			<svg style="width:1.25rem;height:1.25em;vertical-align:middle;" viewBox="0 0 24 24">
				<path fill="currentColor" d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59" />
			</svg>
			{{ foundCards.length }}
		</div>
		<!-- <div class="player__active" v-if="isActive">active</div> -->
	</section>
</template>

<script>
export default {
	name: 'GameboardPlayer',

	props: {
		name: {
			required: true,
			type: String,
		},

		isActive: {
			default: false,
			required: false,
			type: Boolean,
		},

		foundCards: {
			default: () => {
				return [];
			},
			required: false,
			type: Array,
		},
	},
};
</script>

<style lang="scss">
.gameboard-player {
	background: var(--color-background);
	border: 4px solid transparent;
	border-radius: 8px;
	box-shadow:
		0 3px 1px -2px rgba(0, 0, 0, 0.2),
		0 2px 2px 0 rgba(0, 0, 0, 0.14),
		0 1px 5px 0 rgba(0, 0, 0, 0.12);

	padding: var(--spacing-micro) var(--spacing-base);
	position: relative;

	&__name {
		margin: 0;
		white-space: nowrap;
	}

	&--active {
		border-color: var(--color-highlight);
	}
}
</style>
