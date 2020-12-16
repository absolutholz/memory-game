import FormBlock from '.';
import StorybookPlaceholder from './../StorybookPlacholder';

export default {
	title: 'Generic/Form Block',
	component: FormBlock,
};

const Template = (args, { argTypes }) => ({
	components: { FormBlock, StorybookPlaceholder },
	props: Object.keys(argTypes),
	template:  `
		<form-block v-bind="$props">
			<template #legend>Legend</template>
			<storybook-placeholder />
		</form-block>
	`,
});

export const Default = Template.bind({});
Default.args = {
};
