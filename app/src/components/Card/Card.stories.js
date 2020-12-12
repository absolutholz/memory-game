import Card from '.';

export default {
	title: 'Generic/Card',
	component: Card,
};

const Template = (args, { argTypes }) => ({
	components: { Card },
	props: Object.keys(argTypes),
	template:  `
		<div style="max-width: 250px; padding: 5vw;">
			<card v-bind="$props" style="padding-bottom: 100%;" />
		</div>
	`,
});

export const Default = Template.bind({});

export const Elevated = Template.bind({});
Elevated.args = {
	elevated: true,
};
