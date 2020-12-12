<template>
	<gameboard-layout>
		<gameboard-cards
			v-if="cards.length > 0"
			@all-matched="onGameWon"
			@match="onCardMatch"
			@non-match="onCardNonMatch"
			:cards="cards"
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
			/>
		</template>
	</gameboard-layout>
</template>

<script>
import GameboardActions from './../GameboardActions';
import GameboardCards from './../GameboardCards';
import GameboardLayout from './../GameboardLayout';
import GameboardPlayers from './../GameboardPlayers';
import GameboardStatus from './../GameboardStatus';
import GameboardPauseScreen from './../GameboardPauseScreen';

import Card, { colors } from './../../js/Card';
import Timer from './../../js/Timer';
import shuffle from './../../js/array-shuffle';

const STATE_GAME_NOT_STARTED = 'game_not_started';
const STATE_GAME_PLAYING = 'game_playing';
const STATE_GAME_PAUSED = 'game_paused';
const STATE_GAME_OVER = 'game_over';

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

			this.cards = shuffle(createCards(this.cardCount, this.images, this.imagesType));

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
		this.start();
	},
};
</script>
