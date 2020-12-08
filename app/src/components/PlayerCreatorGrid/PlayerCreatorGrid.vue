<template>
	<ol class="player-grid">
		<li>

		</li>
	</ol>
</template>

<script>
export default {
	name: 'PlayerCreatorGrid',
};
</script>

<style lang="scss">
.player-grid {
	display: grid;
	grid-auto-rows: 1fr;
	grid-gap: var(--spacing-base) var(--spacing-base);
	grid-template-columns: repeat(auto-fill, minmax(clamp(50% #{"-"} var(--spacing-base), 25ch, 100%), 1fr));
	margin: var(--spacing-base) 0;

	> * {
		margin: 0;
	}
}
</style>
