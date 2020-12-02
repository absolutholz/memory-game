<template>
	<ul class="preview-list">
		<li v-for="(config, index) in list" :key="index">
			<input class="preview-list__input"
				v-model="selection"
				@change="select(config)"
				:id="`${ groupName }-${ config.id }`"
				:name="groupName"
				type="radio"
				:value="config"
			/>
			<label class="preview-list__label preview" :for="`${ groupName }-${ config.id }`">
				<div
					class="preview__card"
					:class="`${ selection === config ? 'preview__card--lifted' : '' }`"
				>
					<card-back-image class="preview__image" :src="config.cover.image.src" :type="config.cover.type" />
				</div>
				<div class="preview__label">{{ config.name }}</div>
			</label>
		</li>
	</ul>
</template>

<script>
import CardBackImage from './CardBackImage';

export default {
	name: 'PreviewSelector',

	components: {
		CardBackImage,
	},

	data() {
		return {
			selection: this.initialSelection,
		};
	},

	props: {
		list: {
			required: true,
			type: Array,
		},

		groupName: {
			default: 'preview',
			required: false,
			type: String,
		},

		initialSelection: {
			required: false,
		},
	},

	methods: {
		select () {
			this.$emit('on-select', this.selection);
		},
	},
};
</script>

<style lang="scss">
.preview-list {
	list-style: none;
	padding-left: 0;

	display: grid;
	grid-auto-rows: 1fr;
	grid-gap: var(--spacing-base) var(--spacing-base);
	grid-template-columns: repeat(auto-fill, minmax(clamp(15% #{"-"} var(--spacing-base), 50px, 100%), 1fr));
	margin: 0;

	&__input {
		display: none;
	}

	&__label {
		display: block;
	}
}

.preview {
	&__card {
		background: var(--color-background);
		box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
		padding-bottom: 100%;
		position: relative;
		transition: transform 0.5s;

		&--lifted {
			box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
			transform: scale(1.125);
		}
	}

	&__image {
		height: 80%;
		left: 10%;
		object-fit: contain;
		position: absolute;
		top: 10%;
		width: 80%;
		z-index: 0;
	}

	&__label {
		display: none;
		// margin-top: var(--spacing-mini);
		// padding: 0 var(--spacing-micro);
		// text-align: center;
	}
}
</style>
