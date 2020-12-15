<template>
	<section class="results-victorius">

		<div v-if="players.length === 1">
			<h2 class="results-victorius__hdln">Victory!</h2>
			<results-player-victorius :player="players[0]" />
		</div>

		<div v-else>
			<h2 class="results-victorius__hdln">It's a draw!</h2>
			<results-players-list :players="players">
				<template v-slot:default="{ player }">
					<results-player-victorius :player="player" />
				</template>
			</results-players-list>
		</div>

	</section>
</template>

<script>
import ResultsPlayersList from './../ResultsPlayersList';
import ResultsPlayerVictorius from './../ResultsPlayerVictorius';

export default {
	name: 'ResultsPlayersVictorius',

	components: {
		ResultsPlayersList,
		ResultsPlayerVictorius,
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
.results-victorius {
	&__hdln {
		font-size: 4rem;
		margin: 0 0 var(--spacing-mega);
		text-align: center;
	}
}
</style>
