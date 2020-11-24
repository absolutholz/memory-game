<template>
	<figure class="player-result">
		<ul class="player-result__cards mini-card-list">
			<li
				v-for="(cardGroup, cardGroupIndex) in winningPlayerCardGroups(player)" :key="cardGroupIndex"
				class="mini-card-list__item"
			>
				<mini-card
					v-for="(card, index) in cardGroup" :key="index"
					:color="card.color"
				>
					<svg v-if="cardFaceStyle === 'sprite'" class="mini-card__image mini-card__image--svg">
						<use :href="`/shapes.svg#${ card.spriteId }`"></use>
					</svg>
					<svg v-else-if="cardFaceStyle === 'text'" class="mini-card__image" viewBox="0 0 24 24">
						<text fill="currentColor" font-weight="bold" text-anchor="middle" dominant-baseline="central" x="50%" y="50%">{{ card.text }}</text>
					</svg>
					<img v-else class="mini-card__image" :src="card.imageSrc">
				</mini-card>
			</li>
		</ul>
		<figcaption class="player-result__foot">{{ player.name }} found <strong>{{ player.cards.length }}</strong> cards</figcaption>
	</figure>
</template>

<script>
import MiniCard from './../components/MiniCard';

export default {
	name: 'PlayerResult',

	components: {
		MiniCard,
	},

	props: {
		player: {
			required: true,
			type: Object,
		},

		cardFaceStyle: {
			required: false,
			type: String,
		},
	},

	methods: {
		winningPlayerCardGroups (player) {
			const cards = {};

			player.cards.forEach((card) => {
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
