<template>
	<input-group
	>
		<template #label>Player name</template>
		<input
			v-model="proxyName"
			class="input"
			maxlength="20"
			minlength="3"
			required
			type="text"
		/>
		<btn
			@click="deletePlayer"
			class="compound-input__suffix"
			type="button"
		><svg-player-delete aria-hidden="true" aria-label="remove player" class="icon" title="remove player" /></btn>
	</input-group>
</template>

<script>
import Btn from './../Btn';
import InputGroup from './../InputGroup';

import SvgPlayerDelete from '@mdi/svg/svg/account-minus.svg';

import Player from './../../js/Player';

export default {
	name: 'PlayerConfig',

	components: {
		Btn,
		InputGroup,

		SvgPlayerDelete,
	},

	props: {
		player: {
			default: () => {
				return new Player('1');
			},
			required: false,
			type: Player,
		},
	},

	computed: {
		proxyName: {
			get() { return this.player.name; },
			set(newValue) { this.$emit('update', new Player(this.player.id, newValue)); }
		},
	},

	methods: {
		deletePlayer () {
			this.$emit('delete', this.player);
		},
	},
};
</script>
