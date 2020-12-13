<template>
	<main>
		<div v-if="isConfigView">
			<form @submit.prevent="startGame">

				<input-group>
					<template #label>Card count</template>
					<input-number @update="setCardCount" :max="54" :min="8" :step="2" :value="config.cardCount" />
				</input-group>

				<fieldset class="input-group">
					<legend class="input-label">Card theme</legend>
					<card-theme-selector @update="setTheme" :initialSelection="config.theme" />
				</fieldset>

				<player-creator-list @update="setPlayers" />

				<div>
					<btn variant="contained" type="submit">Play</btn>
				</div>
			</form>
		</div>

		<div v-if="isSettingsView">Settings</div>

		<div v-if="isGameView">
			<game
				@configure="configure"
				:cardCount="config.cardCount"
				:images="config.theme.images"
				:imagesType="config.theme.type"
				:players="config.players"
				:theme="config.theme.cover"
			/>
		</div>
	</main>
</template>

<script>
import Btn from '../components/Btn';
import CardThemeSelector, { themes } from './../components/CardThemeSelector';
import Game from './../components/Game';
import InputGroup from './../components/InputGroup';
import InputNumber from './../components/InputNumber';
import PlayerCreatorList from './../components/PlayerCreatorList';

import Player from './../js/Player';

const STATE_VIEW_CONFIG = 'view_config';
const STATE_VIEW_SETTINGS = 'view_settings';
const STATE_VIEW_GAME = 'view_game';

export default {
	name: 'GameView',

	components: {
		Btn,
		CardThemeSelector,
		Game,
		InputGroup,
		InputNumber,
		PlayerCreatorList,
	},

	data () {
		return {
			viewState: STATE_VIEW_CONFIG,

			config: {
				cardCount: 20,
				theme: themes[0],
				players: [
					new Player('1', 'Player 1'),
					new Player('2', 'Player 2'),
				],
			},
		};
	},

	computed: {
		isConfigView () {
			return this.viewState === STATE_VIEW_CONFIG;
		},

		isSettingsView () {
			return this.viewState === STATE_VIEW_SETTINGS;
		},

		isGameView () {
			return this.viewState === STATE_VIEW_GAME;
		},
	},

	methods: {
		startGame () {
			console.log('starting game', this.config);

			this.viewState = STATE_VIEW_GAME;
		},

		setCardCount (cardCount) {
			this.config.cardCount = cardCount;
		},

		setPlayers (players) {
			console.log('update players', players);
			this.config.players = players;
		},

		setTheme (theme) {
			this.config.theme = theme;
		},

		configure () {
			this.viewState = STATE_VIEW_CONFIG;
		},
	},
};
</script>
