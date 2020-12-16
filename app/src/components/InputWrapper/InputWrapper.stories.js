import InputWrapper from '.';

export default {
	title: 'Generic/Input Wrapper',
	component: InputWrapper,
};

const Template = (args, { argTypes }) => ({
	components: { InputWrapper },
	props: Object.keys(argTypes),
	template:  `
		<input-wrapper v-bind="$props"><input type="text" /></input-wrapper>
	`,
});

export const Default = Template.bind({});
Default.args = {
};
