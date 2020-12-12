import Motif from '.';

export default {
	title: 'Generic/Motif',
	component: Motif,
};

const Template = (args, { argTypes }) => ({
	components: { Motif },
	props: Object.keys(argTypes),
	template:  `
		<motif v-bind="$props" style="padding-bottom: 100%;" />
	`,
});

export const Madras = Template.bind({});
Madras.args = {
	id: 'madras',
};

export const Tartan = Template.bind({});
Tartan.args = {
	id: 'tartan',
};

export const Cicada = Template.bind({});
Cicada.args = {
	id: 'cicada',
};

export const Weave = Template.bind({});
Weave.args = {
	id: 'weave',
};

export const Brady = Template.bind({});
Brady.args = {
	id: 'brady',
};

export const Upholstery = Template.bind({});
Upholstery.args = {
	id: 'upholstery',
};

export const Carbon = Template.bind({});
Carbon.args = {
	id: 'carbon',
};

export const Argyle = Template.bind({});
Argyle.args = {
	id: 'argyle',
};

export const Tablecloth = Template.bind({});
Tablecloth.args = {
	id: 'tablecloth',
};
