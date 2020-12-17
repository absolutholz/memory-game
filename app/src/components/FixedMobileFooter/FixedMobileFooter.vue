<template>
	<div class="fixed-mobile-footer">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'FixedMobileFooter',
};
</script>

<style lang="scss">
.fixed-mobile-footer {
	@media (max-width: 400px) {
		background: var(--surface);
		bottom: 0;
		left: 0;
		padding: var(--spacing-mini) var(--spacing-base);
		position: fixed;
		width: 100%;

		.btn {
			width: 100%;
		}
	}
}
</style>
