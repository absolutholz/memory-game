<template>
	<figure class="player-result">
		<card-list-stacked :cardGroups="winningPlayerCardGroups" />
		<figcaption class="player-result__foot">{{ player.name }} found <strong>{{ player.cards.length }}</strong> cards</figcaption>
	</figure>
</template>

<script>
import CardListStacked from './CardListStacked';

export default {
	name: 'PlayerResult',

	components: {
		CardListStacked,
	},

	props: {
		player: {
			required: true,
			type: Object,
		},

		cardFaceStyle: {
			required: false,
			type: Object,
		},
	},

	computed: {
		winningPlayerCardGroups () {
			const cards = {};

			this.player.cards.forEach((card) => {
				if (!cards[card.name]) {
					cards[card.name] = [];
				}
				cards[card.name].push(card);
			});

			return cards;
		},
	},
};
</script>

<style lang="scss">
.player-result {
	display: flex;
	flex-direction: column;

	&__cards {
		flex: 1 1 auto;
	}

	&__foot {
		margin-top: var(--spacing-base);
		text-align: center;
	}
}
</style>
