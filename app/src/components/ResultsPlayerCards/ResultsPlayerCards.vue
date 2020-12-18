<template>
	<list-flexy class="result-cards">
		<li
			v-for="(cardGroup, index) in cardGroups" :key="index"
		>
			<card
				class="result-cards__card"
				:style="`--rotation: ${ (Math.random() * 15) * (Math.random() > 0.5 ? -1 : 1) }deg;`"
			/>
			<card
				class="result-cards__card"
				:style="`--rotation: ${ (Math.random() * 15) * (Math.random() > 0.5 ? -1 : 1) }deg; --on-surface: ${ cardGroup.color };`"
			>
				<card-image :src="cardGroup.faceImage.src" :type="cardGroup.faceImage.type" />
			</card>
		</li>
	</list-flexy>
</template>

<script>
import Card from './../Card';
import CardImage from './../CardImage';
import ListFlexy from './../ListFlexy';

export default {
	name: 'ResultsPlayerCards',

	components: {
		Card,
		CardImage,
		ListFlexy,
	},

	props: {
		cards: {
			required: true,
			type: Array,
		},
	},

	computed: {
		cardGroups () {
			return this.cards.filter((card, index) => index % 2 === 0);
		},
	},
};
</script>

<style lang="scss">
.result-cards {
	--list-spacing-h: var(--spacing-mini);
	--list-spacing-v: var(--list-spacing-h);

	justify-content: center;
	margin: 0;

	> li {
		height: 50px;
		position: relative;
		width: 50px;
	}

	&__card {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		transform: rotate(var(--rotation));
	}
}
</style>
