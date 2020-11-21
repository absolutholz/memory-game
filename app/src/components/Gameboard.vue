<template>
	<div class="gameboard">
		<div class="gameboard__playing-field">
			<slot name="cards" />
		</div>
		<div class="gameboard__scoreboard">
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
	--space: 0.5rem;

	// background: #ccc;
	bottom: 0;
	display: flex;
	flex-direction: column;
	left: 0;
	// padding: var(--spacing-mini);
	position: fixed;
	right: 0;
	top: 0;

	@media (orientation: landscape) {
		flex-direction: row;
	}

	&__playing-field {
		align-items: center;
		// background: #fffff8;
		// border: 2px solid #aaa;
		// border-radius: 1rem;
		// box-shadow: inset 10px 10px 20px -10px #333;
		display: flex;
		flex: 1 1 auto;
		justify-content: center;
		overflow: hidden;
		padding: 1rem;
	}

	&__scoreboard {
		align-items: center;
		// background: #fffff8;
		// border: 2px solid #aaa;
		// border-radius: 1rem;
		// box-shadow: inset 10px 10px 20px -10px #333;
		display: flex;
		flex: 0 0 auto;
		justify-content: center;
		margin-top: var(--spacing-mini);
		overflow: hidden;
		padding: 1rem;

		@media (orientation: landscape) {
			flex-direction: column;
			margin-left: var(--spacing-mini);
			margin-top: 0;
		}
	}
}
</style>
