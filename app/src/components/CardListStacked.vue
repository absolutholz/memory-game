<template>
	<ul class="mini-card-list">
		<li
			v-for="(cardGroup, cardGroupIndex) in cardGroups" :key="cardGroupIndex"
			class="mini-card-list__item"
		>
			<card
				v-for="(card, index) in cardGroup" :key="index"
				class="mini-card-list__card"
				:style="`--rotation: ${ (Math.random() * 15) * (Math.random() > 0.5 ? -1 : 1) }deg; --color: ${ card.color };`"
			>
				<card-image :src="card.image.src" :type="card.type" />
			</card>
		</li>
	</ul>
</template>

<script>
import Card from './Card';
import CardImage from './CardImage';

export default {
	name: 'CardListStacked',

	components: {
		Card,
		CardImage,
	},

	props: {
		cardGroups: {
			required: true,
			type: Object,
		},
	},
};
</script>

<style lang="scss">
.mini-card-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	list-style: none;
	margin: 0;
	padding-left: 0;

	&__item {
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
