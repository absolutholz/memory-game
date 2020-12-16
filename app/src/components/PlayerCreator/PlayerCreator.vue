<template>
	<card class="player-creator">
		<div class="player-creator__image">
			<avatar
				@click.native="changeAvatar"
				class="player-creator__avatar"
				:text="proxyName"
			/>
		</div>

		<div class="player-creator__main">
			<input-group>
				<template #label>Player name</template>
				<input-wrapper>
					<input
						v-model="proxyName"
						class="input"
						maxlength="20"
						minlength="3"
						required
						type="text"
					/>
				</input-wrapper>
			</input-group>
		</div>

		<div class="player-creator__actions">
			<btn
				@click="deletePlayer"
				class="btn--subtle btn--small"
				type="button"
			>
				<svg-player-delete aria-hidden="true" aria-label="remove player" class="icon" title="remove player" /> Remove
			</btn>
		</div>
	</card>
</template>

<script>
import Avatar from './../Avatar';
import Btn from './../Btn';
import Card from './../Card';
import InputGroup from './../InputGroup';
import InputWrapper from './../InputWrapper';

import SvgPlayerDelete from '@mdi/svg/svg/account-minus.svg';

import Player from './../../js/Player';

export default {
	name: 'PlayerConfig',

	components: {
		Avatar,
		Btn,
		Card,
		InputGroup,
		InputWrapper,

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

		changeAvatar () {

		},
	},
};
</script>

<style lang="scss">
.player-creator {
	display: flex;
	flex-wrap: wrap;
	padding: var(--spacing-base);

	&__image {
		margin-right: var(--spacing-base);
	}

	&__main {
		flex: 1 1 auto;
	}

	&__avatar {
		width: 4rem;
	}

	&__actions {
		text-align: right;
		width: 100%;
	}

	.input-group {
		margin: 0;
		width: 100%;
	}
}
</style>
