<template>
	<figure class="avatar">
		<svg class="avatar__image" viewBox="0 0 24 24">
			<text
				fill="currentColor"
				font-size="90%"
				font-weight="bold"
				text-anchor="middle"
				dominant-baseline="central"
				x="50%"
				y="47%"
			>{{ letter }}</text>
		</svg>
	</figure>
</template>

<script>
export default {
	name: 'Avatar',

	props: {
		text: {
			required: true,
			type: String,
		},
	},

	computed: {
		letter () {
			return this.text ? this.text[0].toUpperCase() : ' ';
		},
	},
};
</script>

<style lang="scss">
.avatar {
	border-radius: 99rem;
	display: inline-flex;
	max-width: 100%;
	position: relative;

	&::before {
		content: "";
		display: block;
		padding-bottom: 100%;
	}

	&__image {
		background: var(--primary);
		border-radius: inherit;
		color: var(--on-primary);
		height: 100%;
		left: 0;
		object-fit: cover;
		position: absolute;
		top: 0;
		width: 100%;
	}
}
</style>
