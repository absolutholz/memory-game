<template>
	<section :class="`player${ isActive ? ' player--active' : '' }`">
		<h3 class="player__name">{{ name }}</h3>
		<div>Cards found: {{ foundCards.length }}</div>
		<div class="player__active" v-if="isActive">active</div>
	</section>
</template>

<script>
export default {
	name: 'Player Score',

	props: {
		name: {
			required: true,
			type: String,
		},

		isActive: {
			default: false,
			required: false,
			type: Boolean,
		},

		foundCards: {
			default: () => {
				return [];
			},
			required: false,
			type: Array,
		},
	},
};
</script>

<style>
.player {

}
</style>
