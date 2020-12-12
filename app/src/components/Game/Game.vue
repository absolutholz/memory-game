<template>
	<gameboard-layout>
		cards

		<template #players>
			<gameboard-players :players="players" :activePlayer="activePlayer" />
		</template>

		<template #status>
			<gameboard-status :roundCount="roundCount" :secondsPlayed="secondsPlayed" />
		</template>

		<template #actions>actions</template>
	</gameboard-layout>
</template>

<script>
import GameboardLayout from './../GameboardLayout';
import GameboardPlayers from './../GameboardPlayers';
import GameboardStatus from './../GameboardStatus';

export default {
	name: 'Game',

	components: {
		GameboardLayout,
		GameboardPlayers,
		GameboardStatus,
	},

	props: {
		players: {
			required: true,
			type: Array,
		},
	},

	data () {
		return {
			activePlayer: this.players[0],
			roundCount: 0,
			secondsPlayed: 0,
		};
	},
};
</script>
