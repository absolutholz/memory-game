import Btn from './../Btn';
import FixedMobileFooter from '.';

export default {
	title: 'Fixed Mobile Footer',
	component: FixedMobileFooter,
};

const Template = (args, { argTypes }) => ({
	components: { FixedMobileFooter, Btn },
	props: Object.keys(argTypes),
	template:  `
		<fixed-mobile-footer v-bind="$props">
			<btn>{{ buttonText }}</btn>
		</fixed-mobile-footer>
	`,
});

export const Default = Template.bind({});
Default.args = {
	buttonText: 'Button',
};
