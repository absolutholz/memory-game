<template>
	<ol class="player-grid">
		<li
			v-for="(player, index) in players" :key="index"
		>
			<player-creator :player="player" />
		</li>
	</ol>
</template>

<script>
import PlayerCreator from './../PlayerCreator';

import { Player } from './../PlayerCreator';

export default {
	name: 'PlayerCreatorList',

	components: {
		PlayerCreator,
	},

	props: {
		players: {
			default: () => {
				return [
					new Player('1'),
					new Player('2'),
				];
			},
			required: false,
			type: Array,
		},
	},

};
</script>

<style lang="scss">
.player-grid {
	display: grid;
	grid-auto-rows: 1fr;
	grid-gap: var(--spacing-base) var(--spacing-base);
	grid-template-columns: repeat(auto-fill, minmax(clamp(50% #{"-"} var(--spacing-base), 25ch, 100%), 1fr));
	list-style: none;
	margin: var(--spacing-base) 0;
	padding-left: 0;

	> * {
		margin: 0;
	}
}
</style>
