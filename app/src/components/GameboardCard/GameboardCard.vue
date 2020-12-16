<template>
	<button
		@click="onClick"
		:class="`gameboard-card${ isShowing ? ' gameboard-card--showing' : '' }${ isFound ? ' gameboard-card--found' : '' }`"
		:disabled="isShowing || isFound"
		:style="`--color: ${ color };`"
	>
		<div class="gameboard-card__content">
			<div class="gameboard-card__back">
				<card-image class="gameboard-card__card-image" :src="backImageSrc" :type="backImageType" />
			</div>
			<div class="gameboard-card__face">
				<card-image class="gameboard-card__card-image" :src="faceImageSrc" :type="faceImageType" />
			</div>
		</div>
	</button>
</template>

<script>
import CardImage from './../CardImage';

export default {
	name: 'GameboardCard',

	components: {
		CardImage,
	},

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

		backImageSrc: {
			default: '/apple-touch-icon-152x152.png',
			required: false,
			type: String,
		},

		backImageType: {
			default: 'image',
			required: false,
			type: String,
		},

		faceImageSrc: {
			required: true,
			type: String,
		},

		faceImageType: {
			required: true,
			type: String,
		},
	},

	methods: {
		onClick () {
			this.$emit('select', { name: this.name, id: this.id });
		},
	},
};
</script>

<style lang="scss">
// Card flip animation
// https://codepen.io/edeesims/pen/iGDzk?editors=0100
// https://codepen.io/cojdev/pen/EQZVRN?editors=0100
// https://codepen.io/ettrics/pen/zxMPWj?editors=0100

.gameboard-card {
	display: block;
	padding-bottom: 100%;
	perspective: 500px;
	position: relative;
	transition: opacity 250ms 250ms;
	width: 100%;

	&__content {
		border-radius: 4px;
		box-shadow:
			0 3px 1px -2px rgba(0, 0, 0, 0.2),
			0 2px 2px 0 rgba(0, 0, 0, 0.14),
			0 1px 5px 0 rgba(0, 0, 0, 0.12);
		height: 100%;
		position: absolute;
		transform-style: preserve-3d;
		transition: transform 1s;
		width: 100%;

		.gameboard-card--showing & {
			box-shadow:
				0 5px 5px -3px rgba(0, 0, 0, 0.2),
				0 8px 10px 1px rgba(0, 0, 0, 0.14),
				0 3px 14px 2px rgba(0, 0, 0, 0.12);
			transform: rotateY(180deg) scale(1.125);
			transition: transform 0.5s;
		}
	}

	&__back,
	&__face {
		align-items: center;
		background: var(--surface);
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
		color: var(--primary, --on-surface);
	}

	&__face {
		--surface: #fff;

		color: var(--color, var(--primary, --on-surface));
		transform: rotateY( 180deg );
	}

	&__card-image {
		width: 90%;
	}

	&--found {
		opacity: 0;
		transition-delay: 2s;
	}
}
</style>
