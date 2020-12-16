<template>
	<div>

		<gameboard-layout>
			<gameboard-cards
				v-if="cards.length > 0"
				@all-matched="onGameWon"
				@match="onCardMatch"
				@non-match="onCardNonMatch"
				:cards="cards"
				:gameState="state"
				:themeImageSrc="theme.image.src"
				:themeImageType="theme.type"
			/>

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
					@reconfigure-game="reconfigure"
					@restart-game="restart"
				/>
			</template>
		</gameboard-layout>

		<results-screen
			v-if="isGameOver"
			@reconfigure-game="reconfigure"
			@restart-game="restart"
			:players="players"
		/>

	</div>
</template>

<script>
import GameboardActions from './../GameboardActions';
import GameboardCards from './../GameboardCards';
import GameboardLayout from './../GameboardLayout';
import GameboardPlayers from './../GameboardPlayers';
import GameboardStatus from './../GameboardStatus';
import GameboardPauseScreen from './../GameboardPauseScreen';
import ResultsScreen from './../ResultsScreen';

import Card, { colors } from './../../js/Card';
import Timer from './../../js/Timer';
import shuffle from './../../js/array-shuffle';

export const STATE_GAME_NOT_STARTED = 'game_not_started';
export const STATE_GAME_PLAYING = 'game_playing';
export const STATE_GAME_PAUSED = 'game_paused';
export const STATE_GAME_OVER = 'game_over';
export const STATE_GAME_RESTARTING = 'game_restarting';

function createCards (cardCount, images, type) {
	const cards = [];
	const shuffledColors = shuffle(colors);
	const imagePool = shuffle(images);

	for (let i = 0, l = cardCount / 2; i < l; i++) {
		const name = `${ i }`;
		const color = shuffledColors[name];
		const imageSrc = imagePool[name].src;

		const cardA = new Card(`${ name }-a`, name);
		cardA.faceImage.src = imageSrc;
		cardA.faceImage.type = type;
		cardA.color = color;

		const cardB = new Card(`${ name }-b`, name);
		cardB.faceImage.src = imageSrc;
		cardB.faceImage.type = type;
		cardB.color = color;

		cards.push(cardA);
		cards.push(cardB);
	}

	return cards;
}

export default {
	name: 'Game',

	components: {
		GameboardActions,
		GameboardCards,
		GameboardLayout,
		GameboardPauseScreen,
		GameboardPlayers,
		GameboardStatus,
		ResultsScreen,
	},

	props: {
		cardCount: {
			required: true,
			type: Number,
		},

		images: {
			required: true,
			type: Array,
		},

		imagesType: {
			required: true,
			type: String,
		},

		players: {
			required: true,
			type: Array,
		},

		theme: {
			required: true,
			type: Object,
		},
	},

	data () {
		return {
			activePlayer: this.players[0],
			cards: [],
			roundCount: 1,
			secondsPlayed: 0,
			state: STATE_GAME_NOT_STARTED,
			timer: null,
		};
	},

	computed: {
		isPaused () {
			return this.state === STATE_GAME_PAUSED;
		},

		isGameOver () {
			return this.state === STATE_GAME_OVER;
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

			this.cards = shuffle(createCards(this.cardCount, this.images, this.imagesType));
			this.activePlayer = this.players[0];
			this.roundCount = 1,
			this.secondsPlayed = 0;

			this.timer.start();

			this.state = STATE_GAME_PLAYING;
		},

		restart () {
			console.log('restarting game');
			this.state = STATE_GAME_RESTARTING;

			this.timer.stop();

			setTimeout(() => {
				this.players.forEach((player) => {
					player.cards = [];
				});

				this.start();
			}, 1000);
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

		reconfigure () {
			console.log('reconfigure game');
			this.$emit('configure');
			this.state = STATE_GAME_NOT_STARTED;
		},

		onCardMatch (cards) {
			cards.forEach((matchedCard) => {
				this.activePlayer.cards.push(matchedCard);
			});
		},

		onCardNonMatch () {
			console.log(this.players, this.activePlayer);
			const currentPlayerIndex = this.players.findIndex((player) => player === this.activePlayer);

			if (currentPlayerIndex < this.players.length - 1) {
				this.activePlayer = this.players[currentPlayerIndex + 1];

			} else {
				this.activePlayer = this.players[0];
				this.roundCount += 1;
			}
		},

		onGameWon () {
			this.end();
		},
	},

	mounted () {
		window.addEventListener('blur', this.pause);
		this.start();
	},
};
</script>
