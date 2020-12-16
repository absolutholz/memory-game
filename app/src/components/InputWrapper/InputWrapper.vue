<template>
	<div class="input-wrapper"><slot /></div>
</template>

<script>
export default {
	name: 'InputWrapper',
};
</script>

<style lang="scss">
.input-wrapper {
	border: 1px solid;
	border-radius: 4px;
	position: relative;

	&:focus-within {
		outline: 0;

		@keyframes outline-pulse {
			from {
				opacity: 0.3;
			}

			to {
				opacity: 0.6;
			}
		}

		&::before {
			$size: 3px;
			$space: 2px;

			animation: 1.5s ease-in-out 0s infinite alternate outline-pulse;
			border: $size solid var(--primary);
			border-radius: 7px;
			bottom: ($size + $space) * -1;
			content: "";
			left: ($size + $space) * -1;
			opacity: 0.75;
			pointer-events: none;
			position: absolute;
			right: ($size + $space) * -1;
			top: ($size + $space) * -1;
		}

	}
}
</style>
