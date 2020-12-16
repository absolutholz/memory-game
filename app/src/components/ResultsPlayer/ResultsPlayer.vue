<template>
	<section class="results-player">
		<avatar
			class="results-player__avatar"
			:colorOnSurface="colorOnSurface"
			:colorSurface="colorSurface"
			:text="player.name"
		/>
		<h3 class="results-player__hdln">{{ player.name }}</h3>
		<div class="results-player__body">found <strong>{{ player.cards.length }}</strong> cards</div>
		<results-player-cards
			:cards="player.cards"
			class="results-player__cards"
		/>
	</section>
</template>

<script>
import Avatar from './../Avatar';
import ResultsPlayerCards from './../ResultsPlayerCards';

import Player from './../../js/Player';

export default {
	name: 'ResultsPlayer',

	components: {
		Avatar,
		ResultsPlayerCards,
	},

	props: {
		player: {
			required: true,
			type: Player,
		},
	},

	computed: {
		colorSurface () {
			return this.player.avatar.color?.surface;
		},

		colorOnSurface () {
			return this.player.avatar.color?.onSurface;
		},
	},
};
</script>

<style lang="scss">
.results-player {
	text-align: center;

	&__avatar {
		margin-bottom: var(--spacing-mini);
		width: 9rem;
	}

	&__hdln {
		font-size: var(--typo-size-macro);
		margin: var(--spacing-mini) 0 0;
	}

	&__body {
		margin-top: var(--spacing-mini);

		strong {
			color: var(--primary);
			font-size: 1.5em;
			font-weight: bold;
		}
	}

	&__cards {
		margin-top: var(--spacing-base);
	}
}
</style>
