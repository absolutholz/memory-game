<template>
	<section class="results-player-victorius">
		<star-crown class="results-player-victorius__star-crown" />
		<results-player
			:player="player"
		/>
	</section>
</template>

<script>
import ResultsPlayer from './../ResultsPlayer';
import StarCrown from './../StarCrown';

import Player from './../../js/Player';

export default {
	name: 'ResultsPlayerVictorius',

	components: {
		ResultsPlayer,
		StarCrown,
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
.results-player-victorius {
	&__star-crown {
		display: flex;
		justify-content: center;
		margin-bottom: var(--spacing-mini);
	}
}
</style>
