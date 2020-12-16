<template>
	<card
		:class="`gameboard-player${ isActive ? ' gameboard-player--active' : '' }`"
		:elevated="isActive"
		nodeType="section"
	>
		<div class="gameboard-player__image">
			<avatar class="gameboard-player__avatar" :text="name" />
		</div>
		<div class="gameboard-player__main">
			<h3 class="gameboard-player__name">{{ name }}</h3>
			<div>
				<svg style="width:1.25rem;height:1.25em;vertical-align:middle;" viewBox="0 0 24 24">
					<path fill="currentColor" d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59" />
				</svg>
				{{ foundCards.length }}
			</div>
			<!-- <div class="player__active" v-if="isActive">active</div> -->
		</div>
	</card>
</template>

<script>
import Avatar from './../Avatar';
import Card from './../Card';

export default {
	name: 'GameboardPlayer',

	components: {
		Avatar,
		Card,
	},

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
	align-items: center;
	border: 4px solid transparent;
	display: flex;
	font-size: var(--typo-spacing-base);
	padding: var(--spacing-micro) var(--spacing-mini);
	position: relative;

	@media (min-width: 500px) {
		padding: var(--spacing-micro) var(--spacing-base);
	}

	&__image {
		display: flex;
		margin-right: var(--spacing-mini);
	}

	&__main {

	}

	&__avatar {
		width: 3rem;
	}

	&__name {
		font-size: 1em;
		margin: 0;
		white-space: nowrap;
	}

	&--active {
		border-color: var(--primary);
		transform: scale(1.01);
	}
}
</style>
