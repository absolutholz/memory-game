<template>
	<div v-if="type === 'svg'" class="card__image card__image--svg" v-html="src"></div>
	<img v-else-if="type === 'image'" class="card__image" :src="src">
	<div v-else-if="type === 'pattern'" class="card__pattern" :class="`card__pattern--${ src }`"></div>
	<svg v-else class="card__image card__image--svg" viewBox="0 0 24 24">
		<path fill="currentColor" d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59" />
	</svg>
</template>

<script>
export default {
	name: 'CardBackImage',

	props: {
		src: {
			required: true,
			type: String,
		},

		type: {
			default: 'image',
			required: false,
			type: String,
		},
	},
};
</script>

<style lang="scss">
.card__pattern {
	border-radius: 4px;
	height: 90%;
	left: 5%;
	position: absolute;
	top: 5%;
	width: 90%;
	z-index: 0;

	&--madras {
		background-color: hsl(34, 53%, 82%);
		background-image: repeating-linear-gradient(45deg, transparent 5px, hsla(197, 62%, 11%, 0.5) 5px, hsla(197, 62%, 11%, 0.5) 10px,
			hsla(5, 53%, 63%, 0) 10px, hsla(5, 53%, 63%, 0) 35px, hsla(5, 53%, 63%, 0.5) 35px, hsla(5, 53%, 63%, 0.5) 40px,
			hsla(197, 62%, 11%, 0.5) 40px, hsla(197, 62%, 11%, 0.5) 50px, hsla(197, 62%, 11%, 0) 50px, hsla(197, 62%, 11%, 0) 60px,
			hsla(5, 53%, 63%, 0.5) 60px, hsla(5, 53%, 63%, 0.5) 70px, hsla(35, 91%, 65%, 0.5) 70px, hsla(35, 91%, 65%, 0.5) 80px,
			hsla(35, 91%, 65%, 0) 80px, hsla(35, 91%, 65%, 0) 90px, hsla(5, 53%, 63%, 0.5) 90px, hsla(5, 53%, 63%, 0.5) 110px,
			hsla(5, 53%, 63%, 0) 110px, hsla(5, 53%, 63%, 0) 120px, hsla(197, 62%, 11%, 0.5) 120px, hsla(197, 62%, 11%, 0.5) 140px
		),
			repeating-linear-gradient(135deg, transparent 5px, hsla(197, 62%, 11%, 0.5) 5px, hsla(197, 62%, 11%, 0.5) 10px,
				hsla(5, 53%, 63%, 0) 10px, hsla(5, 53%, 63%, 0) 35px, hsla(5, 53%, 63%, 0.5) 35px, hsla(5, 53%, 63%, 0.5) 40px,
				hsla(197, 62%, 11%, 0.5) 40px, hsla(197, 62%, 11%, 0.5) 50px, hsla(197, 62%, 11%, 0) 50px, hsla(197, 62%, 11%, 0) 60px,
				hsla(5, 53%, 63%, 0.5) 60px, hsla(5, 53%, 63%, 0.5) 70px, hsla(35, 91%, 65%, 0.5) 70px, hsla(35, 91%, 65%, 0.5) 80px,
				hsla(35, 91%, 65%, 0) 80px, hsla(35, 91%, 65%, 0) 90px, hsla(5, 53%, 63%, 0.5) 90px, hsla(5, 53%, 63%, 0.5) 110px,
				hsla(5, 53%, 63%, 0) 110px, hsla(5, 53%, 63%, 0) 140px, hsla(197, 62%, 11%, 0.5) 140px, hsla(197, 62%, 11%, 0.5) 160px
			);
	}

	&--tartan {
		background-color: hsl(2, 57%, 40%);
		background-image: repeating-linear-gradient(transparent, transparent 50px, rgba(0,0,0,.4) 50px, rgba(0,0,0,.4) 53px, transparent 53px, transparent 63px, rgba(0,0,0,.4) 63px, rgba(0,0,0,.4) 66px, transparent 66px, transparent 116px, rgba(0,0,0,.5) 116px, rgba(0,0,0,.5) 166px, rgba(255,255,255,.2) 166px, rgba(255,255,255,.2) 169px, rgba(0,0,0,.5) 169px, rgba(0,0,0,.5) 179px, rgba(255,255,255,.2) 179px, rgba(255,255,255,.2) 182px, rgba(0,0,0,.5) 182px, rgba(0,0,0,.5) 232px, transparent 232px),
			repeating-linear-gradient(270deg, transparent, transparent 50px, rgba(0,0,0,.4) 50px, rgba(0,0,0,.4) 53px, transparent 53px, transparent 63px, rgba(0,0,0,.4) 63px, rgba(0,0,0,.4) 66px, transparent 66px, transparent 116px, rgba(0,0,0,.5) 116px, rgba(0,0,0,.5) 166px, rgba(255,255,255,.2) 166px, rgba(255,255,255,.2) 169px, rgba(0,0,0,.5) 169px, rgba(0,0,0,.5) 179px, rgba(255,255,255,.2) 179px, rgba(255,255,255,.2) 182px, rgba(0,0,0,.5) 182px, rgba(0,0,0,.5) 232px, transparent 232px),
			repeating-linear-gradient(125deg, transparent, transparent 2px, rgba(0,0,0,.2) 2px, rgba(0,0,0,.2) 3px, transparent 3px, transparent 5px, rgba(0,0,0,.2) 5px);
	}

	&--cicada {
		background-color: #026873;
		background-image: linear-gradient(90deg, rgba(255,255,255,.07) 50%, transparent 50%),
			linear-gradient(90deg, rgba(255,255,255,.13) 50%, transparent 50%),
			linear-gradient(90deg, transparent 50%, rgba(255,255,255,.17) 50%),
			linear-gradient(90deg, transparent 50%, rgba(255,255,255,.19) 50%);
		background-size: 13px, 29px, 37px, 53px;
	}

	&--weave {
		background: linear-gradient(45deg, #dca 12%, transparent 0, transparent 88%, #dca 0),
			linear-gradient(135deg, transparent 37%, #a85 0, #a85 63%, transparent 0),
			linear-gradient(45deg, transparent 37%, #dca 0, #dca 63%, transparent 0) #753;
		background-size: 25px 25px;
	}

	&--brady {
		background-color: #C8D3A7;
		background-image:
			radial-gradient(closest-side, transparent 0%, transparent 75%, #B6CC66 76%, #B6CC66 85%, #EDFFDB 86%, #EDFFDB 94%, #FFFFFF 95%, #FFFFFF 103%, #D9E6A7 104%, #D9E6A7 112%, #798B3C 113%, #798B3C 121%, #FFFFFF 122%, #FFFFFF 130%, #E0EAD7 131%, #E0EAD7 140%),
			radial-gradient(closest-side, transparent 0%, transparent 75%, #B6CC66 76%, #B6CC66 85%, #EDFFDB 86%, #EDFFDB 94%, #FFFFFF 95%, #FFFFFF 103%, #D9E6A7 104%, #D9E6A7 112%, #798B3C 113%, #798B3C 121%, #FFFFFF 122%, #FFFFFF 130%, #E0EAD7 131%, #E0EAD7 140%);
		background-size: 110px 110px;
		background-position: 0 0, 55px 55px;
	}

	&--upholstery {
		--hue: 0;
		background:
			radial-gradient(hsl(var(--hue), 100%, 27%) 4%, hsl(var(--hue), 100%, 18%) 9%, hsla(var(--hue), 100%, 20%, 0) 9%) 0 0,
			radial-gradient(hsl(var(--hue), 100%, 27%) 4%, hsl(var(--hue), 100%, 18%) 8%, hsla(var(--hue), 100%, 20%, 0) 10%) 50px 50px,
			radial-gradient(hsla(var(--hue), 100%, 30%, 0.8) 20%, hsla(var(--hue), 100%, 20%, 0)) 50px 0,
			radial-gradient(hsla(var(--hue), 100%, 30%, 0.8) 20%, hsla(var(--hue), 100%, 20%, 0)) 0 50px,
			radial-gradient(hsla(var(--hue), 100%, 20%, 1) 35%, hsla(var(--hue), 100%, 20%, 0) 60%) 50px 0,
			radial-gradient(hsla(var(--hue), 100%, 20%, 1) 35%, hsla(var(--hue), 100%, 20%, 0) 60%) 100px 50px,
			radial-gradient(hsla(var(--hue), 100%, 15%, 0.7), hsla(var(--hue), 100%, 20%, 0)) 0 0,
			radial-gradient(hsla(var(--hue), 100%, 15%, 0.7), hsla(var(--hue), 100%, 20%, 0)) 50px 50px,
			linear-gradient(45deg, hsla(var(--hue), 100%, 20%, 0) 49%, hsla(var(--hue), 100%, 0%, 1) 50%, hsla(var(--hue), 100%, 20%, 0) 70%) 0 0,
			linear-gradient(-45deg, hsla(var(--hue), 100%, 20%, 0) 49%, hsla(var(--hue), 100%, 0%, 1) 50%, hsla(var(--hue), 100%, 20%, 0) 70%) 0 0;
		background-color: hsl(var(--hue), 100%, 10);
		background-size: 100px 100px;
	}

	&--carbon {
		background:
			linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
			linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
			linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
			linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
			linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
			linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);
		background-color: #131313;
		background-size: 20px 20px;
	}

	&--argyle {
		background-color: #6d695c;
		background-image:
			repeating-linear-gradient(120deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),
			repeating-linear-gradient(60deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),
			linear-gradient(60deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1)),
			linear-gradient(120deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1));
		background-size: 70px 120px;
	}

	&--tablecloth {
		background-color: white;
		background-image: linear-gradient(90deg, rgba(200,0,0,.5) 50%, transparent 50%),
			linear-gradient(rgba(200,0,0,.5) 50%, transparent 50%);
		background-size: 50px 50px;
	}
}
</style>
