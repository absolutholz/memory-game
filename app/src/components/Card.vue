<template>
	<button
		@click="onClick"
		:class="`card${ isShowing ? ' card--showing' : '' }${ isFound ? ' card--found' : '' }`"
		:disabled="isShowing || isFound"
	>
		<div class="card__face" hidden>
			<slot />
		</div>
		<div class="card__back">
			<span v-if="$route.query.debug" style="position: relative; z-index: 10;">{{ name }}</span>
			<svg class="card__image card__image--svg" viewBox="0 0 24 24">
				<path fill="currentColor" d="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z" />
			</svg>
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
$background: white;

.card {
	background: $background;
	box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
	border-radius: 4px;
	display: block;
	padding-bottom: 100%;
	position: relative;
	transition: box-shadow 250ms, transform 250ms, opacity 250ms 2s;
	width: 100%;

	&__back,
	&__face {
		align-items: center;
		border: 4px solid dodgerblue;
		border-radius: inherit;
		display: flex;
		height: 100%;
		justify-content: center;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	&__back {
		color: dodgerblue;

		.card--showing & {
			display: none;
		}
	}

	&__face {
		display: none;

		.card--showing & {
			display: block;
		}
	}

	&__image {
		height: 80%;
		left: 10%;
		object-fit: contain;
		position: absolute;
		top: 10%;
		width: 80%;

		&--svg {

		}
	}

	&--found {
		opacity: 0;
	}

	&--showing {
		box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
		transform: scale(1.125);
	}
}
</style>
