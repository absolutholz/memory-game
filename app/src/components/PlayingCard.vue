<template>
	<button
		@click="onClick"
		:class="`playing-card${ isShowing ? ' playing-card--showing' : '' }${ isFound ? ' playing-card--found' : '' }`"
		:disabled="isShowing || isFound"
		:style="`--color: ${ color };`"
	>
		<div class="playing-card__content">
			<div class="playing-card__back">
				<span v-if="$route.query.debug" style="position: relative; z-index: 10;">{{ name }}</span>
				<slot name="back">
					<card-back-image :src="backImageSrc" :type="backImageType" />
				</slot>
			</div>
			<div class="playing-card__face">
				<card-image :src="faceImageSrc" :type="faceImageType" />
			</div>
		</div>
	</button>
</template>

<script>
import CardImage from './CardImage';
import CardBackImage from './CardBackImage';

export default {
	name: 'Card',

	components: {
		CardImage,
		CardBackImage,
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
			required: false,
			type: String,
		},

		backImageType: {
			required: false,
			type: String,
		},

		faceImageSrc: {
			required: false,
			type: String,
		},

		faceImageType: {
			required: false,
			type: String,
		},
	},

	methods: {
		onClick () {
			this.$emit('on-card-select', { name: this.name, id: this.id });
		},
	},
};
</script>

<style lang="scss">
// Card flip animation
// https://codepen.io/edeesims/pen/iGDzk?editors=0100
// https://codepen.io/cojdev/pen/EQZVRN?editors=0100
// https://codepen.io/ettrics/pen/zxMPWj?editors=0100

.playing-card {
	color: var(--color, --primary);
	display: block;
	padding-bottom: 100%;
	perspective: 500px;
	position: relative;
	transition: opacity 250ms var(--card-hide-delay, 2s);
	width: 100%;

	&__content {
		border-radius: 4px;
		box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
		height: 100%;
		position: absolute;
		transform-style: preserve-3d;
		transition: transform 1s;
		width: 100%;

		.playing-card--showing & {
			box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
			transform: rotateY(180deg) scale(1.125);
			transition: transform 0.5s;
		}
	}

	&__back,
	&__face {
		align-items: center;
		background: var(--color-background);
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
		background: #fff;
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
