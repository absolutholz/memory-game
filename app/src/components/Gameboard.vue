<template>
	<div class="gameboard">
		<div class="gameboard__playing-field gameboard__inset">
			<slot />
		</div>
		<div class="gameboard__players gameboard__inset">
			<slot name="players" />
		</div>
		<div class="gameboard__temporal">
			<slot name="temporal" />
		</div>
		<div class="gameboard__actions">
			<ul class="btn-list">
				<li>
					<dark-mode-toggler
						class="btn btn--hollow btn--block"
					><svg-theme aria-hidden="true" class="icon" /></dark-mode-toggler>
				</li>
				<li>
					<button
						@click="restartGame"
						class="btn btn--hollow btn--block"
						type="button"
					><svg-restart aria-hidden="true" class="icon" /></button>
				</li>
				<li>
					<button
						@click="configureNewGame"
						class="btn btn--hollow btn--block"
						type="button"
					><svg-home aria-hidden="true" class="icon" /></button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import DarkModeToggler from './DarkModeToggler';

import SvgHome from '@mdi/svg/svg/home.svg';
import SvgRestart from '@mdi/svg/svg/restart.svg';
import SvgTheme from '@mdi/svg/svg/palette.svg';

export default {
	name: 'Gameboard',

	components: {
		DarkModeToggler,
		SvgHome,
		SvgRestart,
		SvgTheme,
	},

	methods: {
		restartGame () {
			this.$emit('do-restart-game', { name: this.name, id: this.id });
		},

		configureNewGame () {
			this.$emit('do-configure-new-game', { name: this.name, id: this.id });
		},
	},
};
</script>

<style lang="scss">
.gameboard {
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
			background: url("/img/patterns/felt.webp");
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

.btn-list {
	--gutter: var(--spacing-micro);

	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	list-style: none;
	margin: calc(var(--gutter) * -1);
	padding-left: 0;

	> li {
		flex: 1 1 auto;
		padding: var(--gutter);
	}

	@media (min-width: 30rem) {
		--gutter: var(--spacing-mini);
	}
}
</style>
