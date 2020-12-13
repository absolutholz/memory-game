<template>
	<ul class="result-cards">
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
	</ul>
</template>

<script>
import Card from './../Card';
import CardImage from './../CardImage';

export default {
	name: 'ResultCards',

	components: {
		Card,
		CardImage,
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
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	list-style: none;
	margin: 0;
	padding-left: 0;

	> li {
		height: 50px;
		margin: var(--spacing-mini);
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
