<template>
	<div class="temporal">
		<div class="temporal__time"><time-display :seconds="secondsPlayed" /></div>
		<div class="temporal__rounds">Round: {{ roundCount }}</div>
	</div>
</template>

<script>
import TimeDisplay from './TimeDisplay';

export default {
	name: 'TemporalDisplay',

	components: {
		TimeDisplay,
	},

	props: {
		secondsPlayed: {
			default: 0,
			required: false,
			type: Number,
		},

		roundCount: {
			default: 0,
			required: false,
			type: Number,
		},
	},
};
</script>

<style lang="scss">
.temporal {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;

	&__time {

	}

	&__rounds {
		margin-left: var(--spacing-base);
	}
}
</style>
