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

export function activateDarkMode () {
	elRoot.classList.remove(CLASS_THEME_LIGHT);
	elRoot.classList.add(CLASS_THEME_DARK);
	localStorage.theme = LOCAL_STORAGE_THEME_DARK;
}

export function activateLightMode () {
	elRoot.classList.remove(CLASS_THEME_DARK);
	elRoot.classList.add(CLASS_THEME_LIGHT);
	localStorage.theme = LOCAL_STORAGE_THEME_LIGHT;
}

export function isDarkMode () {
	if (localStorage.theme) {
		if (localStorage.theme === LOCAL_STORAGE_THEME_DARK) {
			return true;
		} else {
			return false;
		}
	} else {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return true;
		} else {
			return false;
		}
	}
}

export default {
	main: 'DarkModeToggler',

	data() {
		return {
			isDark: false,
		};
	},

	created() {
		if (isDarkMode()) {
			this.setDarkMode();
		} else {
			this.setLightMode();
		}
	},

	methods: {
		setDarkMode() {
			this.isDark = true;
			activateDarkMode();
		},

		setLightMode() {
			this.isDark = false;
			activateLightMode();
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
