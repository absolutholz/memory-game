import CompoundInput from '.';

export default {
	title: 'Generic/Compound Input',
};

export const prefixOnly = () => ({
	components: { CompoundInput },
	template: `
		<compound-input>
			<template #prefix>pre</template>
			<input placeholder="main block" />
		</compound-input>
	`,
});

export const suffixOnly = () => ({
	components: { CompoundInput },
	template: `
		<compound-input>
		<input placeholder="main block" />
		<template #suffix>suf</template>
		</compound-input>
	`,
});

export const prefixAndSuffix = () => ({
	components: { CompoundInput },
	template: `
		<compound-input>
			<template #prefix>pre</template>
			<input placeholder="main block" />
			<template #suffix>suf</template>
		</compound-input>
	`,
});
