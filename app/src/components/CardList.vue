<template>
	<ol class="card-list" ref="root">
		<li
			v-for="(card, index) in cards" :key="index"
		>
			<card
				:color="card.color"
				:id="card.id"
				:isFound="isCardFound(card)"
				:isShowing="isCardShowing(card)"
				:name="card.name"
				@on-card-select="onCardSelect"
			>
				<svg class="card__image card__image--svg">
					<use :href="`/shapes.svg#${ imageIds[card.name] }`"></use>
				</svg>
			</card>
		</li>
	</ol>
</template>

<script>
import { ref, onMounted } from 'vue';

import Card from './Card';

function sizeList (elList) {
	const nContainerHeight = elList.getBoundingClientRect().height;

	// console.log(elList.scrollHeight, nContainerHeight);
	while (elList.scrollHeight > nContainerHeight) {
		elList.style.setProperty('--width', getComputedStyle(elList).getPropertyValue('--width') / 2);
		// console.log('/ 2', getComputeSdStyle(elList).getPropertyValue('--width'));
	}

	const step = 1.0125;

	while (elList.scrollHeight <= nContainerHeight) {
		elList.style.setProperty('--width', getComputedStyle(elList).getPropertyValue('--width') * step);
		// console.log('* s', getComputedStyle(elList).getPropertyValue('--width'));
	}

	elList.style.setProperty('--width', getComputedStyle(elList).getPropertyValue('--width') / step);
}

export default {
	name: 'CardList',

	components: {
		Card,
	},

	props: {
		cards: {
			required: true,
			type: Array,
		},

		foundCards: {
			required: true,
			type: Array,
		},

		imageIds: {
			required: true,
			type: Array,
		},
	},

	data() {
		return {
			card1: null,
			card2: null,
		};
	},

	methods: {
		onCardSelect (card) {
			console.log(card);

			if (!this.card1) {
				console.log('first', card);
				this.card1 = this.cards.find((cardIter) => cardIter.id === card.id);
			} else if (!this.card2) {
				console.log('second', card);
				this.card2 = this.cards.find((cardIter) => cardIter.id === card.id)

				if (this.card1.name === this.card2.name) {
					console.warn('match!', this.card1, card);
					this.$emit('on-match', [this.card1, this.card2]);

					setTimeout(() => {
						this.card1 = null;
						this.card2 = null;
					}, 2000);
				} else {
					console.info('no match', this.card1, this.card);
					this.$emit('on-non-match');

					setTimeout(() => {
						this.card1 = null;
						this.card2 = null;
					}, 2000);
				}
			}
		},

		isCardFound (card) {
			return !!this.foundCards.find((foundCard) => card.id === foundCard.id);
		},

		isCardShowing (card) {
			return (this.card1 && card.id === this.card1.id) || (this.card2 && card.id === this.card2.id);
		},
	},

	setup() {
		const root = ref(null);

		onMounted(() => {
			sizeList(root.value);
		});

		return {
			root,
		};
	},
};
</script>

<style>
.card-list {
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
}

.card-list	> li {
	flex: 0 1 calc(var(--width) * 100%);
	padding: min(2vw, var(--spacing-base));
}
</style>
