<template>
	<div aria-hidden="true" class="card-image">
		<img v-if="type === 'image'" alt=" " class="card-image__image" :src="src">
		<div v-else-if="type === 'html'" v-html="src" class="card-image__image"></div>
		<motif v-else-if="type === 'pattern'" class="card-image__image" :id="src" />
		<svg v-else-if="type === 'svg-stack'" class="card-image__image"><use :href="src" /></svg>
		<svg v-else-if="type === 'text'" class="card-image__image" viewBox="0 0 24 24">
			<text fill="currentColor" font-weight="bold" text-anchor="middle" dominant-baseline="central" x="50%" y="50%">{{ src }}</text>
		</svg>
		<fallback-image v-else class="card-image__image" />
	</div>
</template>

<script>
import FallbackImage from '@mdi/svg/svg/shape.svg';
import Motif from './../Motif';

export default {
	name: 'CardImage',

	components: {
		FallbackImage,
		Motif,
	},

	props: {
		src: {
			required: false,
			type: String,
		},

		type: {
			required: false,
			type: String,
		},
	},
};
</script>

<style lang="scss">
.card-image {
	padding-bottom: 100%;
	position: relative;

	&__image {
		height: 100%;
		left: 0;
		object-fit: contain;
		position: absolute;
		top: 0;
		width: 100%;
	}
}
</style>
