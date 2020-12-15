<template>
	<ol class="results-players-list">
		<li v-for="(player, index) in players" :key="`list-item-${index}`">
			<slot v-bind:player="player" />
		</li>
	</ol>
</template>

<script>
export default {
	name: 'ResultsPlayersList',

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
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	list-style: none;
	margin: calc(var(--spacing-base) * -1);
	padding-left: 0;

	> li {
		margin: var(--spacing-base);
	}
}
</style>
