<template>
	<ul class="gameboard-btns">
		<!-- <li>
			<dark-mode-toggler
				class="btn btn--hollow btn--block"
			><svg-theme aria-hidden="true" class="icon" /></dark-mode-toggler>
		</li> -->
		<li>
			<btn
				@click="restartGame"
			><svg-restart aria-hidden="true" class="icon" /></btn>
		</li>
		<li>
			<btn
				@click="reconfigureGame"
			><svg-home aria-hidden="true" class="icon" /></btn>
		</li>
	</ul>
</template>

<script>
import Btn from './../Btn';

import SvgHome from '@mdi/svg/svg/home.svg';
import SvgRestart from '@mdi/svg/svg/restart.svg';
// import SvgTheme from '@mdi/svg/svg/palette.svg';

export default {
	name: 'GameboardBtns',

	components: {
		Btn,

		SvgHome,
		SvgRestart,
	},

	methods: {
		restartGame () {
			this.$emit('restart-game');
		},

		reconfigureGame () {
			this.$emit('reconfigure-game');
		},
	},
};
</script>

<style lang="scss">
.gameboard-btns {
	--gutter: var(--spacing-micro);

	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	list-style: none;
	margin: calc(var(--gutter) * -1);
	padding-left: 0;

	> li {
		flex: 0 1 auto;
		padding: var(--gutter);
	}

	@media (min-width: 30rem) {
		--gutter: var(--spacing-mini);
	}
}
</style>
