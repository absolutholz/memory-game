<template>
	<div class="compound-input compound-input--inline">
		<div v-if="!!(this.$slots.prefix || [])[0]" class="compound-input__prefix">
			<slot name="prefix" />
		</div>
		<slot />
		<div v-if="!!(this.$slots.suffix || [])[0]" class="compound-input__suffix">
			<slot name="suffix" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'CompoundInput',
};
</script>

<style lang="scss">
.compound-input {
	display: flex;
	padding: 0;

	&__input {
		background: none;
		border: 0;
		flex: 1 1 auto;
		padding: 0.25em 0.5em;
	}

	&__prefix,
	&__suffix {
		flex: 0 0 auto;
		padding: 0.25em 0.5em;

		&:disabled {
			opacity: 0.4;
		}
	}


	&--inline {
		display: inline-flex;
		width: auto;
	}
}
</style>
