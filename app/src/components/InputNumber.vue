<template>
	<div class="compound-input compound-input--inline input">
		<button
			@click="stepDown"
			:aria-controls="id"
			aria-label="Decrease"
			class="compound-input__prefix"
			:disabled="disabled || proxyValue <= min"
			type="button"
		>
			<svg-subtract aria-hidden="true" class="icon" />
		</button>
		<input
			@change="checkValue"
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
			:disabled="disabled || proxyValue >= max"
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
		},
	},

	methods: {
		checkValue () {
			let value = this.proxyValue;

			if (value < this.min) {
				value = this.min;
			}

			if (value > this.max) {
				value = this.max;
			}

			if (value % this.step !== 0) {
				value = Math.floor(value / this.step) * this.step;
			}

			this.proxyValue = value;
		},

		stepDown () {
			if (this.proxyValue > this.min) {
				this.proxyValue -= this.step;
			}
		},

		stepUp () {
			if (this.proxyValue < this.max) {
				this.proxyValue += this.step;
			}
		},
	},
};
</script>

<style lang="scss">
.number-input {
	text-align: center;
}
</style>
