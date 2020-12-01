<template>
	<router-view />
</template>

<script>
import { isDarkMode, activateDarkMode, activateLightMode } from './components/DarkModeToggler';

export default {
	name: 'App',

	setup () {
		if (isDarkMode()) {
			activateDarkMode();
		} else {
			activateLightMode();
		}
	},
};
</script>

<style lang="scss">
@import "~semantic-reboot/src/reboot-root";
@import "~semantic-reboot/src/reboot-html";
@import "~semantic-reboot/src/reboot-body";
@import "~semantic-reboot/src/reboot-interactions";
@import "~semantic-reboot/src/reboot-anchors";
@import "~semantic-reboot/src/reboot-form-elements";

@mixin theme-light () {
	--color-highlight: #4527a0;
	--color-typography: #11111a;
	--color-background: #fffff8;
}

@mixin theme-dark () {
	--color-highlight: #9575cd;
	--color-typography: #fffff8;
	--color-background: #11111a;
}

:root {
	--spacing-micro: 0.25rem;
	--spacing-mini: 0.5rem;
	--spacing-base: 1rem;
	--spacing-mega: 1.5rem;
	--spacing-macro: 3rem;

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

	background: var(--color-background);
	color: var(--color-typography);
	overflow-y: auto;

	&,
	&.t-light {
		@include theme-light();
	}

	&.t-dark {
		@include theme-dark();
	}

	@media (prefers-color-scheme: dark) {
		@include theme-dark();
	}
}

body {
	overscroll-behavior: none;
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
	display: block;
	float: none;
	font-size: var(--typo-size-mega);
	font-weight: bold;

	.t-dark & {
		color: #ddd;
	}
}

.fieldset {
	&__footer {
		margin-top: var(--spacing-mega);
	}
}

figure {
	margin: 0;
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
	width: Min(50rem, 100%);
}

.btn {
	background: var(--color-highlight);
	border: 2px solid transparent;
	border-radius: 3px;
	color: white;
	display: inline-block;
	font-weight: bold;
	letter-spacing: 0.1ch;
	padding: 0.5em 1em;
	text-align: center;
	text-decoration: none;
	text-transform: capitalize;
	white-space: nowrap;

	&--block {
		display: block;
		width: 100%;
	}

	&--hollow {
		background: none;
		border-color: currentColor;
		color: var(--color-highlight);
	}

	&--small {
		font-size: 0.75em;
		padding: 0 0.25em;
	}

	&:disabled {
		opacity: 0.4;
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
		margin-top: var(--spacing-macro);
	}
}

input,
select,
textarea {
	color: inherit;
}

.input {
	background: var(--color-background);
	border: 2px solid #666;
	border-radius: 3px;
	font-size: var(--typo-size-mega);
	padding: 0.25em 0.5em;
	width: 100%;
}

select.input {
	$icon-size: 1.25em;
	$icon-container-size: $icon-size * 1.5;
	$icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z'></path></svg>";

	appearance: none;
	background: url($icon) no-repeat calc(100% - #{($icon-container-size - $icon-size) / 2}) center / $icon-size $icon-size var(--color-background);
	padding-right: $icon-container-size;
}

.input-group {
	margin-bottom: var(--spacing-base);
	margin-top: var(--spacing-base);
}

.input-label {
	font-size: var(--typo-size-micro);
	margin-bottom: var(--spacing-micro);

	.btn {
		float: right;
	}
}

.icon {
	fill: currentColor;
	font-size: 1.25em;
	height: 1em;
	vertical-align: text-bottom;
}

.icon\+text {
	display: flex;

	&__icon {
		margin-left: 0.25em;
		margin-right: 0.25em;
	}
}

.compound-input {
	display: flex;
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

		&:disabled {
			opacity: 0.4;
		}
	}
}

.rich-text {
	max-width: 60ch;

	> *:first-child {
		margin-top: 0;
	}

	> *:last-child {
		margin-top: 0;
	}
}
</style>
