<template>
	<input-group
	>
		<template #label>Player name</template>
		<input
			v-model="proxyName"
			class="input"
			required
			type="text"
		/>
	</input-group>
</template>

<script>
import InputGroup from './../InputGroup';

export function Player (id, name = 'Player') {
  this.id = id;
  this.name = name;
  this.cards = [];
}

export default {
	name: 'PlayerConfig',

	components: {
		InputGroup,
	},

	props: {
		// id: {
		// 	required: false,
		// 	type: String,
		// 	validator: (value) => {
		// 		return this.player || value;
		// 	},
		// },

		player: {
			// default: () => {
			// 	return Player('asdf');
			// },
			required: true,
			type: Player,
		},
	},

	computed: {
		proxyName: {
			get() { return this.player.name; },
			set(newValue) { this.$emit('update:player', new Player(this.player.id, newValue)); }
		},
	},
};
</script>
