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
				<slot name="back">
					<div v-if="backImageType === 'svg'" class="card__image card__image--svg" v-html="backImageSrc"></div>
					<img v-else-if="backImageType === 'image'" class="card__image" :src="backImageSrc">
					<svg v-else class="card__image card__image--svg" viewBox="0 0 24 24">
						<path fill="currentColor" d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59" />
					</svg>
				</slot>
			</div>
			<div class="card__face">
				<card-image :src="faceImageSrc" :type="faceImageType" />
			</div>
		</div>
	</button>
</template>

<script>
import CardImage from './CardImage';

export default {
	name: 'Card',

	components: {
		CardImage
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

.card {
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

		.card--showing & {
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
