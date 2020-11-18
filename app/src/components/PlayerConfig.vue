<template>
	<label
		class="input-group"
		for="`player-${ player.name }-name`"
	>
		<div class="input-label">Player name</div>
		<input class="input" v-model="player.name" :id="`player-${ player.name }-name`" required type="text">
	</label>
</template>

<script>
export default {
	name: 'PlayerConfig',

	props: {
		player: {
			required: true,
			type: Object,
		},
	},

	data () {
		return {

		};
	},
};
</script>
