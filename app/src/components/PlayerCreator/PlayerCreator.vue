<template>
	<card class="player-creator">
		<div
			class="player-creator__image"
		>
			<button
				@click="changeAvatar"
				type="button"
			>
				<avatar
					class="player-creator__avatar"
					:colorOnSurface="this.player.avatar.onSurfaceColor"
					:colorSurface="this.player.avatar.surfaceColor"
					:symbol="this.player.avatar.symbol"
					:text="proxyName"
				/>
			</button>
			<btn
				v-if="isUpdatingAvatar"
				@click="changeAvatarColor"
				class="avatar__btn avatar__btn--color"
				type="button"
				variant="outlined"
			><svg-avatar-color class="icon" /></btn>
			<btn
				v-if="isUpdatingAvatar"
				@click="changeAvatarSymbol"
				class="avatar__btn avatar__btn--symbol"
				type="button"
				variant="outlined"
			><svg-avatar-symbol class="icon" /></btn>
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
import Avatar, { ICONS, COLORS } from './../Avatar';
import Btn from './../Btn';
import Card from './../Card';
import InputGroup from './../InputGroup';
import InputWrapper from './../InputWrapper';

import SvgPlayerDelete from '@mdi/svg/svg/account-minus.svg';
import SvgAvatarColor from '@mdi/svg/svg/palette.svg';
import SvgAvatarSymbol from '@mdi/svg/svg/shape.svg';

import Player from './../../js/Player';

export default {
	name: 'PlayerCreator',

	components: {
		Avatar,
		Btn,
		Card,
		InputGroup,
		InputWrapper,

		SvgAvatarColor,
		SvgAvatarSymbol,
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

	data () {
		return {
			isUpdatingAvatar: false,
		};
	},

	computed: {
		proxyName: {
			get() { return this.player.name; },
			set(newValue) {
				this.player.name = newValue;
				this.$emit('update', this.player);
			}
		},
	},

	methods: {
		deletePlayer () {
			this.$emit('delete', this.player);
		},

		changeAvatar () {
			this.isUpdatingAvatar = !this.isUpdatingAvatar;
		},

		changeAvatarColor () {
			const currentColorIndex = COLORS.findIndex((color) => color.surface === this.player.avatar.surfaceColor);
			let color = COLORS[0];

			if (currentColorIndex < COLORS.length - 1) {
				color = COLORS[currentColorIndex + 1];
			}

			this.player.avatar.surfaceColor = color.surface;
			this.player.avatar.onSurfaceColor = color.onSurface;

			this.$emit('update', this.player);
		},

		changeAvatarSymbol () {
			const currentIconIndex = ICONS.findIndex((icon) => icon === this.player.avatar.symbol);
			let symbol = ICONS[0];

			if (currentIconIndex < ICONS.length - 1) {
				symbol = ICONS[currentIconIndex + 1];
			} else if (currentIconIndex === ICONS.length - 1) {
				symbol = null;
			}

			console.log(currentIconIndex, symbol);
			this.player.avatar.symbol = symbol;

			this.$emit('update', this.player);
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
		display: flex;
		margin-right: var(--spacing-base);
		position: relative;
	}

	&__main {
		flex: 1 1 auto;
	}

	&__avatar {
		font-size: 1.75em;
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

.avatar {

	&__btn {
		background: var(--surface);
		border: 2px solid var(--primary);
		border-radius: 9em;
		bottom: -1rem;
		box-shadow: 0 0 0px 3px var(--surface);
		font-size: 1rem;
		padding: 3px;
		position: absolute;

		&--color {
			left: -0.5rem;
		}

		&--symbol {
			right: -0.5rem;
		}
	}
}
</style>
