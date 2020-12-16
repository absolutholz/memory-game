<template>
	<fieldset class="form-block">
		<legend class="form-block__legend">
			<slot name="legend"></slot>
		</legend>
		<slot />
	</fieldset>
</template>

<script>
export default {
	name: 'FormBlock',
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";

.form-block {
	margin-bottom: var(--spacing-macro);
	margin-top: var(--spacing-macro);

	&__legend {
		font-size: var(--typo-size-mega);
		font-weight: $typography-weight-bold;
		text-transform: uppercase;
	}
}
</style>
