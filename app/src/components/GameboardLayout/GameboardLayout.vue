<template>
	<div class="gameboard-layout">
		<div class="gameboard-layout__playing-field gameboard-layout__inset">
			<slot />
		</div>
		<div class="gameboard-layout__players gameboard-layout__inset">
			<slot name="players" />
		</div>
		<div class="gameboard-layout__temporal">
			<slot name="temporal" />
		</div>
		<div class="gameboard-layout__actions">
			<slot name="actions" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'GameboardLayout',
};
</script>

<style lang="scss">
.gameboard-layout {
	--gap: var(--spacing-mini);

	display: grid;
	grid-gap: var(--gap);
	grid-template-areas:
		"field field"
		"players players"
		"temporal actions";
	grid-template-columns: auto auto;
	grid-template-rows: 1fr auto auto;

	@media (orientation: landscape) {
		grid-template-areas:
			"field players"
			"field temporal"
			"field actions";
		grid-template-columns: 1fr auto;
		grid-template-rows: 1fr auto auto;
	}

	bottom: 0;
	height: 100%;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;

	background: var(--color-background);
	padding: var(--gap);

	@media (min-width: 900px) {
		--gap: var(--spacing-base);
	}

	&__inset {
		background: Hsla(0, 0%, 90%, 1);
		border-radius: 4px;
		box-shadow:
			inset 0 2px 4px -1px rgba(0, 0, 0, 0.2),
			inset 0 4px 5px 0 rgba(0, 0, 0, 0.14),
			inset 0 1px 10px 0 rgba(0, 0, 0, 0.12);

		padding: var(--gap);
		position: relative;
		z-index: 0;

		&::before {
			// background: url("/img/patterns/felt.webp");
			background-size: 400px;
			content: "";
			height: 100%;
			left: 0;
			opacity: 0.15;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: -1;
		}

		.t-dark & {
			background: Hsla(0, 0%, 0%, 1);
		}
	}

	&__playing-field {
		align-items: center;
		display: flex;
		grid-area: field;
		justify-content: center;
		overflow: hidden;
	}

	&__temporal {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		grid-area: temporal;
		// justify-content: space-between;
	}

	&__players {
		grid-area: players;
	}

	&__actions {
		grid-area: actions;
	}
}
</style>
