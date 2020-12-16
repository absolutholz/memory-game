<template>
	<div class="results-screen">
		<results-players-victorius
			class="results-screen__section"
			:players="playersVictorius"
		/>
		<results-players-non-victorius
			v-if="playersNonVictorius.length"
			class="results-screen__section"
			:players="playersNonVictorius"
		/>
	</div>
</template>

<script>
import ResultsPlayersVictorius from './../ResultsPlayersVictorius';
import ResultsPlayersNonVictorius from './../ResultsPlayersNonVictorius';

export default {
	name: 'ResultsScreen',

	components: {
		ResultsPlayersVictorius,
		ResultsPlayersNonVictorius,
	},

	props: {
		players: {
			required: true,
			type: Array,
		},
	},

	computed: {
		playersVictorius () {
			let victors = [];
			this.players.forEach((player) => {
				if (!victors.length || player.cards.length === victors[0].cards.length) {
					victors.push(player);
				} else if (player.cards.length > victors[0].cards.length) {
					victors = [player];
				}
			});
			return victors;
		},

		playersNonVictorius () {
			return this.players.filter((player) => !this.playersVictorius.includes(player));
		},
	},
};
</script>

<style lang="scss">
.results-screen {
	background: var(--surface);
	left: 0;
	min-height: 100%;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 1;

	&__section {
		margin: var(--spacing-macro) auto;
	}
}
</style>
