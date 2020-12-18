<template>
	<list-flexy class="results-players-list" :ordered="true">
		<li v-for="(player, index) in players" :key="`list-item-${index}`">
			<slot v-bind:player="player" />
		</li>
	</list-flexy>
</template>

<script>
import ListFlexy from './../ListFlexy';

export default {
	name: 'ResultsPlayersList',

	components: {
		ListFlexy,
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
.results-players-list {
	align-items: stretch;
	justify-content: center;

	> li {
		flex: 1 1 auto;
	}
}
</style>
