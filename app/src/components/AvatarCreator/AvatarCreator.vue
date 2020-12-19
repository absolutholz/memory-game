<template>
	<form
		@submit.prevent="save"
		class="form"
	>
		<div class="form__header">
			<btn
				type="submit"
				variant="contained"
			>Select</btn>
		</div>

		<form-block>
			<template #legend>Symbol</template>

			<list-flexy
				class="avatar-list"
			>
				<li>
					<input
						v-model="selectedSymbol"
						class="avatar-list__input"
						id="symbol-letter"
						name="symbol"
						type="radio"
						:value="text"
					/>
					<label
						class="avatar-list__avatar"
						for="symbol-letter"
					>
						<avatar
							:colorOnSurface="selectedBackground.onSurface"
							:colorSurface="selectedBackground.surface"
							:text="text"
						></avatar>
					</label>
				</li>

				<li v-for="(icon, index) in icons" :key="index">
					<input
						v-model="selectedSymbol"
						class="avatar-list__input"
						:id="`symbol-icon-${ index }`"
						name="symbol"
						type="radio"
						:value="icon"
					/>
					<label
						class="avatar-list__avatar"
						:for="`symbol-icon-${ index }`"
					>
						<avatar
							:colorOnSurface="selectedBackground.onSurface"
							:colorSurface="selectedBackground.surface"
							:symbol="icon"
							:text="text"
						></avatar>
					</label>
				</li>
			</list-flexy>
		</form-block>

		<form-block>
			<template #legend>Background</template>

			<list-flexy class="avatar-list">
				<li v-for="(background, index) in backgrounds" :key="index">
					<input
						v-model="selectedBackground"
						class="avatar-list__input"
						:id="`background-${ index }`"
						name="background"
						type="radio"
						:value="background"
					/>
					<label
						class="avatar-list__avatar"
						:for="`background-${ index }`"
					>

						<avatar
							:colorOnSurface="background.onSurface"
							:colorSurface="background.surface"
							:symbol="selectedSymbol"
							:text="text"
						></avatar>
					</label>
				</li>
			</list-flexy>
		</form-block>

		<div class="form__footer">
			<btn
				type="submit"
				variant="contained"
			>Select</btn>
		</div>

	</form>
</template>

<script>
import Avatar from './../Avatar';
import Btn from './../Btn';
import FormBlock from './../FormBlock';
import ListFlexy from './../ListFlexy';

import { ICONS, COLORS, GRADIENTS } from './../Avatar';

import shuffle from './../../js/array-shuffle';

export default {
	name: 'AvatarCreator',

	components: {
		Avatar,
		Btn,
		FormBlock,
		ListFlexy,
	},

	props: {
		colorOnSurface: {
			default: 'var(--on-primary)',
			required: false,
			type: String,
		},

		colorSurface: {
			default: 'var(--primary)',
			required: false,
			type: String,
		},

		text: {
			required: true,
			type: String,
		},
	},

	data () {
		return {
			backgrounds: {...COLORS, ...GRADIENTS},
			icons: shuffle(ICONS),
			selectedSymbol: this.icon || this.text,
			selectedBackground: {
				onSurface: this.colorOnSurface,
				surface: this.colorSurface,
			},
		};
	},

	methods: {
		save () {
			this.$emit('update', {
				background: this.selectedBackground,
				symbol: this.selectedSymbol,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~scss-mixins-functions-variables/scss/layout/visually-hidden-mixins";
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";

.avatar-list {
	--list-spacing-h: var(--spacing-mini);
	--list-spacing-v: var(--spacing-mini);

	&__avatar {
		align-items: center;
		background: var(--surface);
		border-radius: 9em;
		color: var(--on-surface);
		display: flex;
		font-size: 3rem;
		font-weight: $typography-weight-normal;
		height: 2em;
		justify-content: center;
		position: relative;
		width: 2em;
	}

	&__input {
		@include visually-hidden();

		&:focus {
			+ .avatar-list__avatar {
				@keyframes outline-pulse {
					from {
						opacity: 0.3;
					}

					to {
						opacity: 0.6;
					}
				}

				&::before {
					$size: 3px;
					$space: 2px;

					animation: 1.5s ease-in-out 0s infinite alternate outline-pulse;
					border: $size solid var(--primary);
					border-radius: inherit;
					bottom: ($size + $space) * -1;
					content: "";
					left: ($size + $space) * -1;
					opacity: 0.75;
					pointer-events: none;
					position: absolute;
					right: ($size + $space) * -1;
					top: ($size + $space) * -1;
				}
			}
		}

		&:checked {
			+ .avatar-list__avatar {
				transform: scale(1.25);
			}
		}
	}

	&__avatar {
	}
}

.form {
	&__header {
		margin-bottom: var(--spacing-base);
	}

	&__footer {
		margin-top: var(--spacing-base);
	}
}
</style>
