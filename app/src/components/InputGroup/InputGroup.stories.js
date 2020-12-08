import InputGroup from '.';

export default {
	title: 'Input Group',
};

export const standard = () => ({
	components: { InputGroup },
	template: `
		<input-group>
			<template #label>label</template>
			input
		</input-group>
	`,
});

// export const fieldset = () => ({
// 	components: { Card },
// 	template: `
// 		<div style="max-width: 250px; padding: 5vw;">
// 			<card :elevated="true" />
// 		</div>
// 	`,
// });
