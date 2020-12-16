<template>
	<main>
		<container>

		<div v-if="isConfigView">
			<form @submit.prevent="startGame">

				<form-block>
					<template #legend>Cards</template>

					<input-group>
						<template #label>Count</template>
						<input-wrapper>
							<input-number @update="setCardCount" :max="54" :min="8" :step="2" :value="config.cardCount" />
						</input-wrapper>
					</input-group>

					<fieldset class="input-group">
						<legend class="input-label">Theme</legend>
						<card-theme-selector @update="setTheme" :initialSelection="config.theme" />
					</fieldset>
				</form-block>

				<form-block>
					<template #legend>Players</template>

					<player-creator-list
						@update="setPlayers"
						:players="config.players"
					/>
				</form-block>

				<div>
					<btn
						class="btn--large"
						variant="contained"
						type="submit"
					>Play</btn>
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

		</container>
	</main>
</template>

<script>
import Btn from '../components/Btn';
import CardThemeSelector, { themes } from './../components/CardThemeSelector';
import Container from './../components/Container';
import FormBlock from './../components/FormBlock';
import Game from './../components/Game';
import InputGroup from './../components/InputGroup';
import InputNumber from './../components/InputNumber';
import InputWrapper from './../components/InputWrapper';
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
		Container,
		FormBlock,
		Game,
		InputGroup,
		InputNumber,
		InputWrapper,
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

			window.localStorage.cardCount = this.config.cardCount;
			window.localStorage.theme = JSON.stringify(this.config.theme);
			window.localStorage.players = JSON.stringify(this.config.players);

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

	created () {
		if (window.localStorage.cardCount) {
			this.config.cardCount = window.localStorage.cardCount * 1;
		}

		if (window.localStorage.theme) {
			this.config.theme = JSON.parse(window.localStorage.theme);
		}

		if (window.localStorage.players) {
			this.config.players = JSON.parse(window.localStorage.players).map((playerObject) => {
				const player = new Player(playerObject.id, playerObject.name);
				player.avatar = playerObject.avatar;
				return player;
			});
		}
	},
};
</script>
