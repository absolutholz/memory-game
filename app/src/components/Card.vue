<template>
	<button @click="onClick" class="card" :disabled="isFound">
		<div class="card__face" hidden>
			{{ name }}
		</div>
		<div class="card__back">
			<span v-if="$route.query.debug" style="position: relative; z-index: 10;">{{ name }}</span>
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
	box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
	border-radius: 4px;
	display: block;
	padding-bottom: 100%;
	position: relative;
	transition: opacity 1s;
	width: 100%;

	&:disabled {
		opacity: 0;
	}

	&__back,
	&__face {
		align-items: center;
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
		&::before {
			background: $background;
			border: 4px solid dodgerblue;
			bottom: 4px;
			content: "";
			left: 4px;
			position: absolute;
			right: 4px;
			top: 4px;
		}
	}

	&__face {
		background: dodgerblue;
	}
}
</style>
