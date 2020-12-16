<template>
	<section class="results-non-victorius">
		<h2 class="results-non-victorius__hdln">Better luck next time</h2>

		<div v-if="players.length === 1">
			<results-player :player="players[0]" />
		</div>

		<div v-else>
			<results-players-list :players="players">
				<template v-slot:default="{ player }">
					<results-player :player="player" />
				</template>
			</results-players-list>
		</div>

	</section>
</template>

<script>
import ResultsPlayersList from './../ResultsPlayersList';
import ResultsPlayer from './../ResultsPlayer';

export default {
	name: 'ResultsPlayersNonVictorius',

	components: {
		ResultsPlayersList,
		ResultsPlayer,
	},

	props: {
		players: {
			required: true,
			type: Array,
		},
	},
};
</script>

<style lang="scss">
.results-non-victorius {
	&__hdln {
		font-size: var(--typo-size-macro);
		margin: 0 0 var(--spacing-mega);
		text-align: center;
	}
}
</style>
