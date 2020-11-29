<template>
	<ol class="scoreboard-player-list">
		<li v-for="(player, index) in players" :key="index">
			<scoreboard-player
				:foundCards="player.cards"
				:isActive="activePlayer === player"
				:name="player.name"
			/>
		</li>
	</ol>
</template>

<script>
import ScoreboardPlayer from './ScoreboardPlayer';

export default {
	name: 'ScoreboardPlayerList',

	components: {
		ScoreboardPlayer,
	},

	props: {
		players: {
			required: true,
			type: Array,
		},

		activePlayer: {
			required: true,
			type: Object,
		},
	},
};
</script>

<style lang="scss">
.scoreboard-player-list {
	--gutter: var(--spacing-micro);

	// display: flex;
	// flex-wrap: wrap;
	list-style: none;
	margin: calc(var(--gutter) * -1);
	padding-left: 0;

	// @media (orientation: landscape) {
	// 	display: block;
	// }

	> li {
		display: inline-block;
		// flex: 0 1 auto;
		margin: var(--gutter);

		@media (orientation: landscape) {
			display: block;
		}
	}

	@media (min-width: 600px) {
		--gutter: var(--spacing-mini);
	}

	@media (min-width: 900px) {
		--gutter: var(--spacing-base);
	}
}
</style>
