<template>
	<list-flexy
		class="gameboard-cards"
		:class="isRestarting ? `gameboard-cards--reloading` : ''"
		:ordered="true"
	>
		<li v-for="(card, index) in cards" :key="index">
			<gameboard-card
				@select="onCardSelect(card)"
				:backImageSrc="themeImageSrc"
				:backImageType="themeImageType"
				:color="card.color"
				:faceImageSrc="card.faceImage.src"
				:faceImageType="card.faceImage.type"
				:id="`${ index }`"
				:isFound="isCardFound(card)"
				:isShowing="isCardShowing(card)"
				:name="`${ index }`"
			/>
		</li>
	</list-flexy>
</template>

<script>
import GameboardCard from './../GameboardCard';
import ListFlexy from './../ListFlexy';

import { STATE_GAME_RESTARTING } from './../Game';

function sizeList (elList) {
	const nContainerHeight = elList.getBoundingClientRect().height;

	console.log(elList, elList.getBoundingClientRect(), elList.scrollHeight, nContainerHeight);
	while (elList.scrollHeight > nContainerHeight) {
		elList.style.setProperty('--width', getComputedStyle(elList).getPropertyValue('--width') / 2);
		console.log('/ 2', getComputedStyle(elList).getPropertyValue('--width'));
	}

	const step = 1.0125;

	let iterationCount = 0;
	while (elList.scrollHeight <= nContainerHeight && iterationCount < 50) {
		iterationCount++;
		elList.style.setProperty('--width', getComputedStyle(elList).getPropertyValue('--width') * step);
		console.log('* s', getComputedStyle(elList).getPropertyValue('--width'));
	}

	elList.style.setProperty('--width', getComputedStyle(elList).getPropertyValue('--width') / step);
}

export default {
	name: 'GameboardCards',

	components: {
		GameboardCard,
		ListFlexy,
	},

	props: {
		cards: {
			required: true,
			type: Array,
		},

		gameState: {
			required: false,
			type: String,
		},

		themeImageType: {
			required: false,
			type: String,
		},

		themeImageSrc: {
			required: false,
			type: String,
		},
	},

	data () {
		return {
			activeCards: {
				card1: null,
				card2: null,
			},
			foundCards: [],
		};
	},

	computed: {
		isRestarting () {
			return this.gameState === STATE_GAME_RESTARTING;
		},
	},

	methods: {
		hideActiveCards () {
			this.activeCards.card1 = null;
			this.activeCards.card2 = null;
		},

		onCardSelect (card) {
			if (!this.activeCards.card1) {
				// console.log('first', card);
				this.activeCards.card1 = this.cards.find((cardIter) => cardIter.id === card.id);
			} else if (!this.activeCards.card2) {
				// console.log('second', card);
				this.activeCards.card2 = this.cards.find((cardIter) => cardIter.id === card.id)

				if (this.activeCards.card1.name === this.activeCards.card2.name) {
					// console.warn('match!', this.activeCards.card1, card);

					this.foundCards.push(this.activeCards.card1);
					this.foundCards.push(this.activeCards.card2);

					this.$emit('match', [this.activeCards.card1, this.activeCards.card2]);

					setTimeout(() => {
						this.hideActiveCards();
					}, 2000);

					if (this.foundCards.length === this.cards.length) {
						this.$emit('all-matched');
					}
				} else {
					// console.info('no match', this.activeCards.card1, this.card);
					this.$emit('non-match');

					setTimeout(() => {
						this.hideActiveCards();
					}, 2000);
				}
			}
		},

		isCardFound (card) {
			return !!this.foundCards.find((foundCard) => card.id === foundCard.id);
		},

		isCardShowing (card) {
			return (this.activeCards.card1 && card.id === this.activeCards.card1.id)
				|| (this.activeCards.card2 && card.id === this.activeCards.card2.id);
		},
	},

	mounted () {
		sizeList(this.$el);

		window.addEventListener('orientationchange', () => {
			this.$el.style.setProperty('--width', 1);
			setTimeout(() => {
				sizeList(this.$el);
			}, 150);
		});
	},

	unmounted () {
		window.removeEventListener('orientationchange');
	},

	watch: {
		isRestarting (value) {
			if (!value) {
				this.foundCards = [];
			}
		},
	},
};
</script>

<style lang="scss">
.gameboard-cards {
	--gutter: var(--spacing-micro);
	--width: 1;

	align-items: center;
	justify-content: center;
	margin: 0;
	max-height: 100%;
	width: 100%;

	> li {
		flex: 0 1 calc(var(--width) * 100%);
		margin: 0;
		padding: Min(2vw, var(--gutter));
		transition: opacity 250ms;
		will-change: opacity;
	}

	@media (min-width: 600px) {
		--gutter: var(--spacing-mini);
	}

	@media (min-width: 900px) {
		--gutter: var(--spacing-base);
	}

	&--reloading {
		> li {
			opacity: 0;
		}
	}
}
</style>
