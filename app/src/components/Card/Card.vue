<template>
	<component
		class="card"
		:class="`${ elevated ? 'card--elevated' : '' }`"
		:is="nodeType"
	><slot /></component>
</template>

<script>
export default {
	name: 'Card',

	props: {
		elevated: {
			default: false,
			required: false,
			type: Boolean,
		},

		nodeType: {
			default: 'div',
			required: false,
			type: String,
		},
	},
};
</script>

<style lang="scss">
.card {
	background: var(--surface);
	border-radius: 4px;
	box-shadow:
		0 3px 1px -2px rgba(0, 0, 0, 0.2),
		0 2px 2px 0 rgba(0, 0, 0, 0.14),
		0 1px 5px 0 rgba(0, 0, 0, 0.12);
	color: var(--on-surface);
	display: block;
	padding: 10%;
	transition: transform 0.5s, box-shadow 0.5s;
	width: 100%;
	will-change: transform, box-shadow;

	&--elevated {
		box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
		transform: scale(1.125);
	}
}
</style>
