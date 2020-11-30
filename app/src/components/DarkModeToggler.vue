<template>
	<button
		@click="toggle"
		:aria-checked="`${isDark}`"
		role="switch"
		type="button"
	>
		<slot />
	</button>
</template>

<script>
const elRoot = document.querySelector('html');

const CLASS_THEME_LIGHT = 't-light';
const CLASS_THEME_DARK = 't-dark';

const LOCAL_STORAGE_THEME_LIGHT = 'light';
const LOCAL_STORAGE_THEME_DARK = 'dark';

export default {
	main: 'DarkModeToggler',

	data() {
		return {
			isDark: false,
		};
	},

	created() {
		if (localStorage.theme) {
			if (localStorage.theme === LOCAL_STORAGE_THEME_DARK) {
				this.setDarkMode();
			} else{
				this.setLightMode();
			}

		} else {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				this.setDarkMode();
			} else {
				this.setLightMode();
			}
		}
	},

	methods: {
		setDarkMode() {
			this.isDark = true;
			elRoot.classList.remove(CLASS_THEME_LIGHT);
			elRoot.classList.add(CLASS_THEME_DARK);
			localStorage.theme = LOCAL_STORAGE_THEME_DARK;
		},

		setLightMode() {
			this.isDark = false;
			elRoot.classList.remove(CLASS_THEME_DARK);
			elRoot.classList.add(CLASS_THEME_LIGHT);
			localStorage.theme = LOCAL_STORAGE_THEME_LIGHT;
		},

		toggle() {
			if (this.isDark) {
				this.setLightMode();
			} else {
				this.setDarkMode();
			}
		},
	},
};
</script>
