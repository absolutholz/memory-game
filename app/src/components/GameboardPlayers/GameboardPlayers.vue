<template>
	<list-flexy
		class="gameboard-players"
		:ordered="true"
	>
		<li v-for="(player, index) in players" :key="index">
			<gameboard-player
				:avatar="player.avatar"
				:foundCards="player.cards"
				:isActive="activePlayer === player"
				:name="player.name"
			/>
		</li>
	</list-flexy>
</template>

<script>
import GameboardPlayer from './../GameboardPlayer';
import ListFlexy from './../ListFlexy';

export default {
	name: 'GameboardPlayers',

	components: {
		GameboardPlayer,
		ListFlexy,
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
	--list-spacing-v: var(--spacing-micro);
	--list-spacing-h: var(--list-spacing-v);

	> li {
		@media (orientation: landscape) {
			flex: 1 1 100%;
		}
	}

	@media (min-width: 600px) {
		--list-spacing-v: var(--spacing-mini);
	}
}
</style>
