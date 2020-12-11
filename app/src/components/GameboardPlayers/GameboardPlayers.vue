<template>
	<ol class="gameboard-players">
		<li v-for="(player, index) in players" :key="index">
			<gameboard-player
				:foundCards="player.cards"
				:isActive="activePlayer === player"
				:name="player.name"
			/>
		</li>
	</ol>
</template>

<script>
import GameboardPlayer from './../GameboardPlayer';

export default {
	name: 'GameboardPlayers',

	components: {
		GameboardPlayer,
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
.gameboard-players {
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
