<template>
	<component
		@click="click"
		class="btn"
		:class="variantClass"
		:href="href"
		:is="nodeType"
		:to="to"
	>
		<span class="btn__bg"></span>
		<span class="btn__main"><slot /></span>
	</component>
</template>

<script>
export default {
	name: 'Btn',

	props: {
		href: {
			required: false,
			type: String,
		},

		to: {
			required: false,
			type: [String, Object],
		},

		variant: {
			default: 'text',
			required: false,
			type: String,
			validator: function (value) {
				return ['text', 'contained', 'outlined'].indexOf(value) !== -1;
			},
		},
	},

	computed: {
		nodeType () {
			if (this.href) {
				return 'a';
			} else if (this.to) {
				return 'router-link';
			} else {
				return 'button';
			}
		},

		variantClass () {
			switch (this.variant) {
				case 'contained':
					return 'btn--contained';
				case 'outlined':
					return 'btn--outlined';
			}
			return null;
		},
	},

	methods: {
		click () {
			this.$emit('click');
		},
	},
};
</script>

<style lang="scss">
// https://material.io/components/buttons
.btn {
	--spacing-h: 1rem;
	--spacing-v: 0.5rem;

	align-items: center;
	// border: 1px solid transparent;
	border-radius: 4px;
	color: var(--primary, inherit);
	display: inline-flex;
	font-size: 0.875em;
	font-weight: 500;
	justify-content: center;
	letter-spacing: 0.1575ch;
	line-height: 1;
	max-width: 100%;
	overflow: hidden;
	padding: var(--spacing-v) var(--spacing-h);
	position: relative;
	text-decoration: none;
	text-overflow: ellipsis;
	text-transform: uppercase;
	white-space: nowrap;
	// will-change: transform, opacity;
	z-index: 0;

	&__bg {
		height: 100%;
		left: 0;
		position: absolute;
		top:0;
		width: 100%;
		z-index: 1;

		&::before {
			background: currentColor;;
			content: "";
			display: block;
			height: 100%;
			opacity: 0;
			width: 100%;
			will-change: opacity;

			.btn:hover &,
			.btn:focus & {
				opacity: 0.04;
			}

			.btn:active & {
				opacity: 0.12;
			}
		}
	}

	&__main {
		position: relative;
		z-index: 2;
	}

	&:focus {
		// outline: 0;
	}

	&--outlined {
		border: 1px solid;
		padding: calc(var(--spacing-v) - 1px) calc(var(--spacing-h) - 1px);
	}

	&--contained {
		background: var(--primary, inherit);
		box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);
		color: var(--on-primary, inherit);
		transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
		will-change: box-shadow;

		&:hover,
		&:focus {
			box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);

			.btn__bg {
				&::before {
					opacity: 0.08;
				}
			}
		}

		&:active {
			box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);

			.btn__bg {
				&::before {
					opacity: 0.24;
				}
			}
		}
	}

	&--block {
		display: flex;
		width: 100%;
	}
}
</style>
