<template>
	<router-view />
</template>

<script>
export default {
	name: 'App',
};
</script>

<style>
*, ::before, ::after {
	box-sizing: border-box;
}

:root {
	background: #fffff7;
	color: #111;
	font: 1em / 1.5 sans-serif;
}

body {
	font-size: 1.125rem;
	margin: 0;
}

button {
	background: none;
	border: 0;
	border-radius: 0;
	color: inherit;
	display: inline-block;
	font: inherit;
	margin: 0;
	padding: 0;
	text-align: inherit;
	width: auto;
}
</style>
