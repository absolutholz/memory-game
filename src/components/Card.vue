<template>
	<button @click="onClick" class="card" :disabled="isFound">
		<div class="card__face" hidden>
			{{ name }}
		</div>
		<div class="card__back">
			{{ name }}
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

	setup() {
	},
};
</script>

<style>
.card {
	background: dodgerblue;
	display: block;
	padding-bottom: 100%;
	position: relative;
	transition: opacity 1s;
	width: 100%;
}

.card:disabled {
	opacity: 0;
}

.card__back,
.card__face {
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}
</style>
