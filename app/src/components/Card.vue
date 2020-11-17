<template>
	<button
		@click="onClick"
		:class="`card${ isShowing ? ' card--showing' : '' }${ isFound ? ' card--found' : '' }`"
		:disabled="isShowing || isFound"
		:style="`--color: ${ color };`"
	>
		<div class="card__content">
			<div class="card__back">
				<span v-if="$route.query.debug" style="position: relative; z-index: 10;">{{ name }}</span>
				<svg class="card__image card__image--svg" viewBox="0 0 24 24">
					<path fill="currentColor" d="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z" />
				</svg>
			</div>
			<div class="card__face">
				<slot />
			</div>
		</div>
	</button>
</template>

<script>
export default {
	name: 'Card',

	props: {
		id: {
			required: true,
			type: String,
		},

		name: {
			required: true,
			type: String,
		},

		color: {
			required: false,
			type: String,
		},

		isFound: {
			default: false,
			required: false,
			type: Boolean,
		},

		isShowing: {
			default: false,
			required: false,
			type: Boolean,
		},
	},

	methods: {
		onClick () {
			this.$emit('on-card-select', { name: this.name, id: this.id });
		},
	},

	setup () {
	},
};
</script>

<style lang="scss">
// Card flip animation
// https://codepen.io/edeesims/pen/iGDzk?editors=0100
// https://codepen.io/cojdev/pen/EQZVRN?editors=0100
// https://codepen.io/ettrics/pen/zxMPWj?editors=0100

.card {
	color: var(--color, --primary);
	display: block;
	padding-bottom: 100%;
	perspective: 500px;
	position: relative;
	transition: opacity 250ms 2s;
	width: 100%;

	&__content {
		border-radius: 4px;
		box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
		height: 100%;
		position: absolute;
		transform-style: preserve-3d;
		transition: transform 1s;
		width: 100%;

		.card--showing & {
			box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
			transform: rotateY(180deg) scale(1.125);
			transition: transform 0.5s;
		}
	}

	&__back,
	&__face {
		align-items: center;
		background: white;
		border-radius: inherit;
		display: flex;
		height: 100%;
		justify-content: center;
		left: 0;
		position: absolute;
		backface-visibility: hidden;
		top: 0;
		transform-style: preserve-3d;
		width: 100%;
	}

	&__back {
		color: var(--color-highlight);
	}

	&__face {
		transform: rotateY( 180deg );
	}

	&__image {
		height: 80%;
		left: 10%;
		object-fit: contain;
		position: absolute;
		top: 10%;
		width: 80%;
		z-index: 0;

		&--svg {

		}
	}

	&--found {
		opacity: 0;
	}
}
</style>
