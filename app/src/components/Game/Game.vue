<template>
	<gameboard-layout>
		cards

		<gameboard-pause-screen
			v-if="isPaused"
			@click.native="resume"
		/>

		<template #players>
			<gameboard-players
				:activePlayer="activePlayer"
				:players="players"
			/>
		</template>

		<template #status>
			<gameboard-status
				:roundCount="roundCount"
				:secondsPlayed="secondsPlayed"
			/>
		</template>

		<template #actions>
			<gameboard-actions
				@pause-game="pause"
			/>
		</template>
	</gameboard-layout>
</template>

<script>
import GameboardActions from './../GameboardActions';
import GameboardLayout from './../GameboardLayout';
import GameboardPlayers from './../GameboardPlayers';
import GameboardStatus from './../GameboardStatus';
import GameboardPauseScreen from './../GameboardPauseScreen';

import Timer from './../../js/Timer';

const STATE_GAME_NOT_STARTED = 'game_not_started';
const STATE_GAME_PLAYING = 'game_playing';
const STATE_GAME_PAUSED = 'game_paused';
const STATE_GAME_OVER = 'game_over';

export default {
	name: 'Game',

	components: {
		GameboardActions,
		GameboardLayout,
		GameboardPauseScreen,
		GameboardPlayers,
		GameboardStatus,
	},

	props: {
		players: {
			required: true,
			type: Array,
		},
	},

	data () {
		return {
			activePlayer: this.players[0],
			roundCount: 0,
			secondsPlayed: 0,
			state: STATE_GAME_NOT_STARTED,
			timer: null,
		};
	},

	computed: {
		isPaused () {
			return this.state === STATE_GAME_PAUSED;
		},
	},

	methods: {
		start () {
			console.log('starting game');

			if (!this.timer) {
				this.timer = Timer(1000);
				this.timer.addObserver({ update: () => {
					this.secondsPlayed += 1;
				}});
			}

			window.addEventListener('blur', this.pause);

			this.timer.start();

			this.state = STATE_GAME_PLAYING;
		},

		pause () {
			if (this.state === STATE_GAME_PLAYING) {
				console.log('pausing game');

				this.timer.stop();

				this.state = STATE_GAME_PAUSED;
			}
		},

		resume () {
			console.log('resuming game');

			this.timer.start();

			this.state = STATE_GAME_PLAYING;
		},

		end () {
			this.timer.stop();

			this.state = STATE_GAME_OVER;
		},
	},

	mounted () {
		this.start();
	},
};
</script>
