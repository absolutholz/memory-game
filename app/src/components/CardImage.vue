<template>
	<svg v-if="type === 'svg-stack'" class="card__image card__image--svg">
		<use :href="src"></use>
	</svg>
	<svg v-else-if="type === 'svg-text'" class="card__image" viewBox="0 0 24 24">
		<text fill="currentColor" font-weight="bold" text-anchor="middle" dominant-baseline="central" x="50%" y="50%">{{ src }}</text>
	</svg>
	<img v-else class="card__image" :src="src">
</template>

<script>
export default {
	name: 'CardImage',

	props: {
		src: {
			default: 'image',
			required: false,
			type: String,
		},

		type: {
			required: true,
			type: String,
		},
	},
};
</script>
