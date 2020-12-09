<template>
	<compound-input>
		<template #prefix>
			<button
				@click="stepDown"
				:aria-controls="id"
				aria-label="Decrease"
				:disabled="disabled || proxyValue <= min"
				type="button"
			>
				<svg-subtract aria-hidden="true" class="icon" />
			</button>
		</template>
		<input
			@change="checkValue"
			class="compound-input__input number-input"
			:disabled="disabled"
			:id="id"
			:max="max"
			:min="min"
			:required="required"
			:step="step"
			type="number"
			v-model="proxyValue"
		>
		<template #suffix>
			<button
				@click="stepUp"
				:aria-controls="id"
				aria-label="Increase"
				:disabled="disabled || proxyValue >= max"
				type="button"
			>
				<svg-add aria-hidden="true" class="icon" />
			</button>
		</template>
	</compound-input>
</template>

<script>
import CompoundInput from './../CompoundInput';

import SvgAdd from '@mdi/svg/svg/plus-box-multiple.svg';
import SvgSubtract from '@mdi/svg/svg/minus-box-multiple.svg';

export default {
	name: 'InputNumber',

	components: {
		CompoundInput,
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
			set(newValue) { this.$emit('update', newValue); }
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
	appearance: textfield;
	text-align: center;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
}
</style>
