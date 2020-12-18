<template>
	<div>
		<list-unstyled
			class="player-creator-list"
			:ordered="true"
		>
			<li
				v-for="(player, index) in playersProxy" :key="index"
			>
				<player-creator
					@delete="deletePlayer"
					@update="updatePlayer"
					:player="player"
				/>
			</li>
		</list-unstyled>
		<div>
			<btn
				@click="createPlayer"
				:disabled="playersProxy.length >= maxPlayerCount"
				variant="outlined"
				type="button"
			>Add Player</btn>
		</div>
	</div>
</template>

<script>
import Btn from './../Btn';
import ListUnstyled from './../ListUnstyled';
import PlayerCreator from './../PlayerCreator';

import Player from './../../js/Player';

export default {
	name: 'PlayerCreatorList',

	components: {
		Btn,
		ListUnstyled,
		PlayerCreator,
	},

	props: {
		players: {
			default: () => {
				return [
					new Player('1', 'Player 1'),
					new Player('2', 'Player 2'),
				];
			},
			required: false,
			type: Array,
		},

		maxPlayerCount: {
			default: 4,
			required: false,
			type: Number,
		},
	},

	data () {
		return {
			playersProxy: this.players,
		};
	},

	methods: {
		createPlayer () {
			const id = this.playersProxy.length + 1;
			this.playersProxy.push(new Player(`${ id }`, `Player ${ id }`));
			this.$emit('update', this.playersProxy);
		},

		updatePlayer (updatedPlayer) {
			const indexToRemove = this.playersProxy.findIndex((player) => player.id === updatedPlayer.id);
			if (indexToRemove > -1) {
				this.playersProxy.splice(indexToRemove, 1, updatedPlayer);
				console.log('update player', updatedPlayer, this.playersProxy, indexToRemove);
				this.$emit('update', this.playersProxy);
			}
		},

		deletePlayer (playerToRemove) {
			console.log(playerToRemove);
			const indexToRemove = this.playersProxy.findIndex((player) => player === playerToRemove);
			this.playersProxy.splice(indexToRemove, 1);
			this.$emit('update', this.playersProxy);
		},
	},
};
</script>

<style lang="scss">
.player-creator-list {
	display: grid;
	grid-auto-rows: 1fr;
	grid-gap: var(--spacing-base) var(--spacing-mega);
	grid-template-columns: repeat(auto-fill, minmax(clamp(50% #{"-"} var(--spacing-base), 25ch, 100%), 1fr));
	margin: var(--spacing-macro) 0 var(--spacing-base) 0;

	> li {
		margin: 0;
	}
}
</style>
