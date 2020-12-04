<template>
	<ul class="preview-list">
		<li>
			<input class="preview-list__input"
				v-model="selection"
				@change="select(cardStyleCover)"
				:id="`${ groupName }-card-style`"
				:name="groupName"
				type="radio"
				:value="cardStyleCover"
			/>
			<label class="preview-list__label preview" :for="`${ groupName }-card-style`">
				<card :elevated="isSelected(cardStyleCover)">
					<card-back-image class="preview__image" :src="cardStyleCover.image.src" :type="cardStyleCover.type" />
				</card>
			</label>
		</li>
		<li v-for="(pattern, index) in patterns" :key="index">
			<input class="preview-list__input"
				v-model="selection"
				@change="select(pattern)"
				:id="`${ groupName }-${ pattern.image }`"
				:name="groupName"
				type="radio"
				:value="pattern"
			/>
			<label class="preview-list__label preview" :for="`${ groupName }-${ pattern.image }`">
				<card :elevated="isSelected(pattern)">
					<card-back-image class="preview__image" :src="pattern.image" type="pattern" />
				</card>
			</label>
		</li>
	</ul>
</template>

<script>
import Card from './Card';
import CardBackImage from './CardBackImage';

import patterns from './../patterns';

export default {
	name: 'PreviewSelectorBackSide',

	components: {
		Card,
		CardBackImage,
	},

	data() {
		return {
			selection: this.initialSelection,
			patterns,
		};
	},

	props: {
		cardStyleCover: {
			required: true,
			type: Object,
		},

		groupName: {
			default: 'preview',
			required: false,
			type: String,
		},

		initialSelection: {
			required: false,
			type: Object,
		},
	},

	methods: {
		select () {
			this.$emit('on-select', this.selection);
		},

		isSelected (cover) {
			return this.selection === cover;
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
