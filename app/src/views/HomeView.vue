<template>
	<main>
		<container>

			<h1>
				<abbr aria-label="Progressive Web App" class="app-hdln__small" title="Progressive Web App">PWA</abbr><br>
				Memory
			</h1>

			<fixed-mobile-footer>
				<btn class="btn--large" variant="contained" to="/game"><svg-play class="icon" /> Play</btn>
			</fixed-mobile-footer>

			<rich-text>
				<p>This is the classic, simple Memory game, for 2 to 4 players and with 8 to 54 cards. Try to find more matching cards
					than your opponent. It can be played on all modern devices, from phones to tablets, computers and TVs. With a
					variety of card designs and even more to come.</p>
				<p>What does <abbr>PWA</abbr> mean? It stands for Progressive Web App, which is a term for a collection of technologies
					that allow a webpage to behave more like an app from the app store. It can be installed on many devices and can then
					be opened from a list of other apps installed on your device. It will also open in its own window instead of the
					web browser.</p>
			</rich-text>

		</container>
	</main>
</template>

<script>
import Btn from './../components/Btn';
import Container from './../components/Container';
import FixedMobileFooter from './../components/FixedMobileFooter';
import RichText from './../components/RichText';

import SvgPlay from '@mdi/svg/svg/play.svg';

export default {
	name: 'HomeView',

	components: {
		Btn,
		Container,
		FixedMobileFooter,
		RichText,
		SvgPlay,
	},
};
</script>
