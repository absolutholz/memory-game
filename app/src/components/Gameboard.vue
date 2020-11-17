<template>
	<div class="gameboard">
		<div class="gameboard__cards">
			<slot name="cards" />
		</div>
		<div class="gameboard__score">
			<slot name="score" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Gameboard',
};
</script>

<style lang="scss">
.gameboard {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;

	@media (orientation: landscape) {
		flex-direction: row;
	}

	&__cards {
		align-items: center;
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		justify-content: center;
		max-height: 100%;
	}

	&__score {
		align-items: center;
		display: flex;
		flex: 0 1 auto;
		justify-content: center;
		min-width: 10vw;
		padding: var(--spacing-base);

		@media (orientation: landscape) {
			flex-direction: column;
		}
	}
}
</style>
