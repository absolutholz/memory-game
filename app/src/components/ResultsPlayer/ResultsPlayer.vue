<template>
	<section class="results-player">
		<h3 class="results-player__hdln">{{ player.name }}</h3>
		<div class="results-player__body">found <strong>{{ player.cards.length }}</strong> cards</div>
		<results-player-cards
			:cards="player.cards"
			class="results-player__cards"
		/>
	</section>
</template>

<script>
import ResultsPlayerCards from './../ResultsPlayerCards';

import Player from './../../js/Player';

export default {
	name: 'ResultsPlayer',

	components: {
		ResultsPlayerCards,
	},

	props: {
		player: {
			required: true,
			type: Player,
		},
	},
};
</script>

<style lang="scss">
.results-player {
	text-align: center;

	&__hdln {
		font-size: var(--typo-size-macro);
		margin: 0;
	}

	&__body {
		margin-top: var(--spacing-base);
	}

	&__cards {
		margin-top: var(--spacing-base);
	}
}
</style>
