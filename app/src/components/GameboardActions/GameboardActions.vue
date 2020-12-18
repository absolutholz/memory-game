<template>
	<list-flexy class="gameboard-actions">
		<!-- <li>
			<dark-mode-toggler
				class="btn btn--hollow btn--block"
			><svg-theme aria-hidden="true" class="icon" /></dark-mode-toggler>
		</li> -->
		<li>
			<btn
				@click="$emit('restart-game')"
				aria-label="Restart the game"
				class="gameboard-actions__btn"
				title="Restart the game"
			><svg-restart aria-hidden="true" class="icon" /></btn>
		</li>
		<li>
			<btn
				@click="$emit('pause-game')"
				aria-label="Pause the game"
				class="gameboard-actions__btn"
				title="Pause the game"
			><svg-pause aria-hidden="true" class="icon" /></btn>
		</li>
		<li>
			<btn
				@click="$emit('reconfigure-game')"
				aria-label="Reconfigure the game"
				class="gameboard-actions__btn"
				title="Reconfigure the game"
			><svg-home aria-hidden="true" class="icon" /></btn>
		</li>
	</list-flexy>
</template>

<script>
import Btn from './../Btn';
import ListFlexy from './../ListFlexy';

import SvgHome from '@mdi/svg/svg/home.svg';
import SvgPause from '@mdi/svg/svg/pause.svg';
import SvgRestart from '@mdi/svg/svg/restart.svg';
// import SvgTheme from '@mdi/svg/svg/palette.svg';

export default {
	name: 'GameboardActions',

	components: {
		Btn,
		ListFlexy,

		SvgHome,
		SvgPause,
		SvgRestart,

		// SvgTheme,
	},
};
</script>

<style lang="scss">
.gameboard-actions {
	--list-spacing-v: var(--spacing-micro);
	--list-spacing-h: var(--list-spacing-v);

	justify-content: flex-end;

	@media (orientation: landscape) {
		justify-content: center;
	}

	@media (min-width: 30rem) {
		--list-spacing-v: var(--spacing-mini);
	}

	> li {
		flex: 0 1 auto;
	}

	&__btn {
		padding: 0.5rem;
	}
}
</style>
