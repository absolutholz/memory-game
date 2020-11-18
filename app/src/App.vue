<template>
	<router-view />
</template>

<script>
export default {
	name: 'App',
};
</script>

<style lang="scss">
@import "~semantic-reboot/src/reboot-root";
@import "~semantic-reboot/src/reboot-html";
@import "~semantic-reboot/src/reboot-body";
@import "~semantic-reboot/src/reboot-interactions";
@import "~semantic-reboot/src/reboot-anchors";
@import "~semantic-reboot/src/reboot-form-elements";

:root {
	--color-highlight: rebeccapurple;
	--color-typography: #11111a;
	--color-background: #fffff8;

	--typo-size-micro: 0.75rem;
	--typo-size-mini: 0.875rem;
	--typo-size-base: 1rem;
	--typo-size-mega: 1.25rem;
	--typo-size-macro: 1.75rem;

	@media (min-width: 20rem) {
		--typo-size-micro: 0.875rem;
		--typo-size-mini: 1rem;
		--typo-size-base: 1.125rem;
		--typo-size-meag: 1.5rem;
		--typo-size-macro: 2rem;
	}

	--spacing-micro: 0.25rem;
	--spacing-mini: 0.5rem;
	--spacing-base: 1rem;
	--spacing-mega: 1.5rem;
	--spacing-macro: 3rem;
}

body {
	font-size: var(--typo-size-base);
}

button {
	background: none;
	border: 0;
	border-radius: 0;
	color: inherit;
	display: inline-block;
	font: inherit;
	margin: 0;
	padding: 0;
	text-align: inherit;
	width: auto;
}

fieldset {
	margin-top: var(--spacing-macro);
}

legend {
	color: #333;
	font-size: var(--typo-size-micro);
	font-weight: bold;
	margin-bottom: var(--spacing-micro);
}

figure {
	margin: 0;
}

.input-group {
	margin-top: var(--spacing-base);
}

.l-container {
	padding: var(--spacing-base);
}

.l-center {
	// align-items: center;
	display: flex;
	justify-content: center;
	min-height: calc(100vh - 2rem);
	width: 100%;
}

.l-min-width {
	width: Min(25rem, 100%);
}

.btn {
	background: var(--color-highlight);
	border-radius: 3px;
	color: white;
	letter-spacing: 0.1ch;
	padding: 0.5em 1em;
	text-align: center;
	text-transform: capitalize;

	&--block {
		display: block;
		width: 100%;
	}
}

.section {
	&__hdln {
		font-size: var(--typo-size-macro);
		font-weight: bold;
		margin-bottom: var(--spacing-macro);
		margin-top: 0;
	}

	&__footer {
		margin-top: var(--spacing-macros);
	}
}

.input {
	background: white;
	border: 2px solid #666;
	border-radius: 3px;
	font-size: var(--typo-size-macro);
	padding: 0.125em 0.5em;
	width: 100%;
}

.input-label {
	margin-bottom: 0.5rem;
}
</style>
