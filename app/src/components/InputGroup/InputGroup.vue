<template>
	<label class="input-group" for="card-count">
		<div class="input-label"><slot name="label" /></div>
		<slot />
	</label>
</template>

<script>
export default {
	name: 'InputGroup',
};
</script>

<style lang="scss">
.input-group {
	margin-bottom: var(--spacing-base);
	margin-top: var(--spacing-base);
}

.input-label {
	font-size: var(--typo-size-micro);
	font-weight: normal;
	margin-bottom: var(--spacing-mini);
}
</style>
