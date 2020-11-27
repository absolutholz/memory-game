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
	display: flex;
	flex-wrap: wrap;
	list-style: none;
	margin: calc(var(--spacing-mini) * -1);
	padding-left: 0;


	> li {
		flex: 0 1 auto;
		margin: var(--spacing-mini);

		@media (orientation: landscape) {
			flex: 1 1 100%;
		}
	}
}
</style>
