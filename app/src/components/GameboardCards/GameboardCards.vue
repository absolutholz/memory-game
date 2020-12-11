<template>
	<ol class="gameboard-cards">
		<li v-for="(card, index) in cards" :key="index">
			<gameboard-card
				faceImageSrc="/android-chrome-512x512.png"
				faceImageType="image"
				:id="`${ index }`"
				:isFound="isCardFound(card)"
				:isShowing="isCardShowing(card)"
				:name="`${ index }`"
				@select="onCardSelect"
			/>
		</li>
	</ol>
</template>

<script>
import GameboardCard from './../GameboardCard';

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

// function Gameboard () {
// 	const activeCards = reactive({
// 		card1: null,
// 		card2: null,
// 	});

// 	const hideActiveCards = () => {
// 		activeCards.card1 = null;
// 		activeCards.card2 = null;
// 	};

// 	return { activeCards, hideActiveCards };
// }

export default {
	name: 'GameboardCards',

	components: {
		GameboardCard,
	},

	props: {
		cards: {
			required: true,
			type: Array,
		},

		foundCards: {
			default () {
				return [];
			},
			required: true,
			type: Array,
		},

		// hideCardsKey: {
		// 	required: false,
		// 	type: Number,
		// },

		// cardBackType: {
		// 	required: false,
		// 	type: String,
		// },

		// cardBackSrc: {
		// 	required: false,
		// },
	},

	methods: {
		onCardSelect (card) {
			console.log(card);

			// if (!this.activeCards.card1) {
			// 	// console.log('first', card);
			// 	this.activeCards.card1 = this.cards.find((cardIter) => cardIter.id === card.id);
			// } else if (!this.activeCards.card2) {
			// 	// console.log('second', card);
			// 	this.activeCards.card2 = this.cards.find((cardIter) => cardIter.id === card.id)

			// 	if (this.activeCards.card1.name === this.activeCards.card2.name) {
			// 		// console.warn('match!', this.activeCards.card1, card);
			// 		this.$emit('on-match', [this.activeCards.card1, this.activeCards.card2]);

			// 		setTimeout(() => {
			// 			this.hideActiveCards();
			// 		}, 2000);
			// 	} else {
			// 		// console.info('no match', this.activeCards.card1, this.card);
			// 		this.$emit('on-non-match');

			// 		setTimeout(() => {
			// 			this.hideActiveCards();
			// 		}, 2000);
			// 	}
			// }
		},

		isCardFound (card) {
			// return !!this.foundCards.find((foundCard) => card.id === foundCard.id);
		},

		isCardShowing (card) {
			// return (this.activeCards.card1 && card.id === this.activeCards.card1.id) || (this.activeCards.card2 && card.id === this.activeCards.card2.id);
		},
	},

	mounted () {
		console.log(this.$el);
		sizeList(this.$el);
	},

	// setup(props) {
	// 	const elRoot = ref(null);
	// 	const { activeCards, hideActiveCards } = Gameboard();

	// 	onMounted(() => {
	// 		sizeList(elRoot.value);
	// 	});

	// 	window.addEventListener('orientationchange', () => {
	// 		elRoot.value.style.setProperty('--width', 1);
	// 		setTimeout(() => {
	// 			sizeList(elRoot.value);
	// 		}, 150);
	// 	});

	// 	watch(() => props.hideCardsKey, () => {
	// 		hideActiveCards();
	// 		elRoot.value.style.setProperty('--card-hide-delay', '0s');
	// 		setTimeout(() => {
	// 			elRoot.value.style.removeProperty('--card-hide-delay');
	// 		}, 1000);
	// 	});

	// 	return {
	// 		elRoot,
	// 		activeCards,
	// 		hideActiveCards,
	// 	};
	// },
};
</script>

<style lang="scss">
.gameboard-cards {
	--gutter: var(--spacing-micro);
	--width: 1;

	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	list-style: none;
	margin: 0;
	max-height: 100%;
	padding-left: 0;
	width: 100%;

	> li {
		flex: 0 1 calc(var(--width) * 100%);
		padding: Min(2vw, var(--gutter));
	}

	@media (min-width: 600px) {
		--gutter: var(--spacing-mini);
	}

	@media (min-width: 900px) {
		--gutter: var(--spacing-base);
	}
}
</style>