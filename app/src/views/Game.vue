<template>
	<main>
		<div v-if="viewState === STATE_VIEW_CONFIG">
			<form>

				<input-group>
					<template #label>Card count</template>
					<input-number />
				</input-group>

				<div>
					<button type="submit">Play</button>
				</div>
			</form>
		</div>

		<div v-if="viewState === STATE_VIEW_SETTINGS">Settings</div>

		<div v-if="viewState === STATE_VIEW_GAME">Game</div>
	</main>
</template>

<script>
import InputGroup from './../components/InputGroup';
import InputNumber from './../components/InputNumber';

const STATE_VIEW_CONFIG = 'view_config';
const STATE_VIEW_SETTINGS = 'view_settings';
const STATE_VIEW_GAME = 'view_game';

const STATE_GAME_NOT_STARTED = 'game_not_started';
const STATE_GAME_PLAYING = 'game_playing';
// const STATE_GAME_PAUSED = 'game_paused';
// const STATE_GAME_OVER = 'game_over';

export default {
	name: 'Game',

	components: {
		InputGroup,
		InputNumber,
	},

	data () {
		return {
			viewState: STATE_VIEW_CONFIG,
			gameState: STATE_GAME_NOT_STARTED,

			STATE_VIEW_CONFIG,
			STATE_VIEW_SETTINGS,
			STATE_VIEW_GAME,
		};
	},

	methods: {
		startGame () {
			this.viewState = STATE_VIEW_GAME;
			this.gameState = STATE_GAME_PLAYING ;
		},
	},
};
</script>
