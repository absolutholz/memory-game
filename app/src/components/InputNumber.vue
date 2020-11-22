<template>
	<div class="compound-input input">
		<button
			@click="stepDown"
			:aria-controls="id"
			aria-label="Decrease"
			class="compound-input__prefix"
			:disabled="disabled"
			type="button"
		>
			<svg-subtract aria-hidden="true" class="icon" />
		</button>
		<input
			class="compound-input__input number-input"
			:diabled="disabled"
			:id="id"
			:max="max"
			:min="min"
			:required="required"
			:step="step"
			type="number"
			v-model="proxyValue"
		>
		<button
			@click="stepUp"
			:aria-controls="id"
			aria-label="Increase"
			class="compound-input__suffix"
			:disabled="disabled"
			type="button"
		>
			<svg-add aria-hidden="true" class="icon" />
		</button>
	</div>
</template>

<script>
import SvgAdd from '@mdi/svg/svg/plus-box-multiple.svg';
import SvgSubtract from '@mdi/svg/svg/minus-box-multiple.svg';

export default {
	name: 'InputNumber',

	components: {
		SvgAdd,
		SvgSubtract,
	},

	props: {
		disabled: {
			default: false,
			required: false,
			type: Boolean,
		},

		id: {
			default: 'number',
			required: false,
			type: String,
		},

		max: {
			default: 100,
			required: false,
			type: Number,
		},

		min: {
			default: 0,
			required: false,
			type: Number,
		},

		required: {
			default: true,
			required: false,
			type: Boolean,
		},

		step: {
			default: 1,
			required: false,
			type: Number,
		},

		value: {
			default: 0,
			required: false,
			type: Number,
		},
	},

	computed: {
		proxyValue: {
			get() { return this.value; },
			set(newValue) { this.$emit('update:value', newValue); }
		}
	},

	methods: {
		stepDown () {
			this.proxyValue -= this.step;
		},

		stepUp () {
			this.proxyValue += this.step;
		},
	},
};
</script>

<style lang="scss">
.number-input {
	text-align: center;
}

.compound-input {
	display: inline-flex;
	padding: 0;

	&__input {
		appearance: textfield;
		background: none;
		border: 0;
		flex: 1 1 auto;
		padding: 0.25em 0.5em;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}

	&__prefix,
	&__suffix {
		flex: 0 0 auto;
		padding: 0.25em 0.5em;
	}
}
</style>
