<template>
	<div
		class="mini-card"
		:style="`--rotation: ${ (Math.random() * 15) * (Math.random() > 0.5 ? -1 : 1) }deg; --color: ${ color };`"
	>
		<slot>
			<svg v-if="faceImageType === 'svg-stack'" class="card__image card__image--svg">
				<use :href="faceImageSrc"></use>
			</svg>
			<svg v-else-if="faceImageType === 'svg-text'" class="card__image" viewBox="0 0 24 24">
				<text fill="currentColor" font-weight="bold" text-anchor="middle" dominant-baseline="central" x="50%" y="50%">{{ faceImageSrc }}</text>
			</svg>
			<img v-else class="card__image" :src="faceImageSrc">
		</slot>
	</div>
</template>

<script>
export default {
	name: 'MiniCard',

	props: {
		color: {
			required: false,
			type: String,
		},

		faceImageSrc: {
			required: true,
			type: String,
		},

		faceImageType: {
			required: true,
			type: String,
		},
	},
};
</script>

<style lang="scss">
.mini-card {
	background: white;
	border-radius: 4px;
	box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
	color: var(--color, --primary);
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	transform: rotate(var(--rotation));
	width: 100%;

	&__image {
		height: 80%;
		left: 10%;
		object-fit: contain;
		position: absolute;
		top: 10%;
		width: 80%;
		z-index: 0;
	}

	// &:nth-child(even) {
	// 	top: 20%;
	// 	left: 20%;
	// }
}
</style>
