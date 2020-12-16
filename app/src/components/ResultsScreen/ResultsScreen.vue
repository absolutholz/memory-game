<template>
	<div class="results-screen">
		<container>
			<results-players-victorius
				class="results-screen__section"
				:players="playersVictorius"
			/>

			<results-players-non-victorius
				v-if="playersNonVictorius.length"
				class="results-screen__section"
				:players="playersNonVictorius"
			/>

			<btn-list class="results-screen__section results-screen__btn-list">
					<btn
						@click="$emit('restart-game')"
						aria-label="Restart the game"
						title="Restart the game"
						variant="outlined"
					><svg-restart aria-hidden="true" class="icon" /> Replay</btn>
					<btn
						@click="$emit('reconfigure-game')"
						aria-label="Reconfigure the game"
						title="Reconfigure the game"
						variant="outlined"
					><svg-home aria-hidden="true" class="icon" /> New Game</btn>
			</btn-list>

		</container>
	</div>
</template>

<script>
import Btn from './../Btn';
import BtnList from './../BtnList';
import Container from './../Container';
import ResultsPlayersVictorius from './../ResultsPlayersVictorius';
import ResultsPlayersNonVictorius from './../ResultsPlayersNonVictorius';

import SvgHome from '@mdi/svg/svg/home.svg';
import SvgRestart from '@mdi/svg/svg/restart.svg';

export default {
	name: 'ResultsScreen',

	components: {
		Btn,
		BtnList,
		Container,
		ResultsPlayersVictorius,
		ResultsPlayersNonVictorius,

		SvgHome,
		SvgRestart,
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

	&__btn-list {
		text-align: center;
	}
}
</style>
