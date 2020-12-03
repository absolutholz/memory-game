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
				<card :elevated="selection === config">
					<card-back-image class="preview__image" :src="config.cover.image.src" :type="config.cover.type" />
				</card>
				<div class="preview__label">{{ config.name }}</div>
			</label>
		</li>
	</ul>
</template>

<script>
import Card from './Card';
import CardBackImage from './CardBackImage';

export default {
	name: 'PreviewSelector',

	components: {
		Card,
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
	grid-template-columns: repeat(auto-fill, minmax(clamp(15% #{"-"} var(--spacing-base), 70px, 100%), 1fr));
	margin: 0;

	&__input {
		display: none;
	}

	&__label {
		display: block;
	}
}

.preview {
	&__label {
		display: none;
		// margin-top: var(--spacing-mini);
		// padding: 0 var(--spacing-micro);
		// text-align: center;
	}
}
</style>
