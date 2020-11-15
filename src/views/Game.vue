<template>
	<h1 hidden>Game</h1>

	<section class="game-config" v-if="playState === state.STATE_GAME_STOPPED">
		<form @submit.prevent="startGame">
			<label for="card-count">
				<div>Number of cards</div>
				<input v-model="config.cardCount"  id="card-count" max="100" min="4" required step="2" type="number">
			</label>

			<fieldset>
				<legend>Players</legend>

				<label for="player-1-name">
					<div>Player 1</div>
					<input v-model="config.player1" id="player-1-name" required type="text">
				</label>

				<label for="player-2-name">
					<div>Player 2</div>
					<input v-model="config.player2" id="player-2-name" required type="text">
				</label>
			</fieldset>

			<div>
				<button type="submit">Start game</button>
			</div>
		</form>
	</section>

	<section class="gameboard" v-if="playState === state.STATE_GAME_PLAYING">
		<section class="gameboard__cards">
			<card-list
				@on-match="onMatch"
				@on-non-match="onNonMatch"
				:cards="cards"
				:foundCards="foundCards"
			/>
		</section>
		<section class="gameboard__state">
			<ol>
				<li>
					<player-score
						:foundCards="player1Cards"
						:isActive="playerTurn === config.player1"
						:name="config.player1"
					/>
				</li>
				<li>
					<player-score
						:foundCards="player2Cards"
						:isActive="playerTurn === config.player2"
						:name="config.player2"
					/>
				</li>
			</ol>
		</section>
	</section>
</template>

<script>
import { reactive } from "vue";
import CardList from './../components/CardList';
import PlayerScore from './../components/PlayerScore';

const STATE_GAME_STOPPED = 'not-started';
const STATE_GAME_PLAYING = 'playing';

function GameConfig () {
	let config = reactive({
		cardCount: 20,
		player1: 'Player 1',
		player2: 'Player 2',
	});

	const cards = [];

  return { config, cards };
}

// Fisher-Yates (aka Knuth) Shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

export default {
	name: 'Game',

	components: {
		CardList,
		PlayerScore,
	},

	data() {
		return {
			playState: STATE_GAME_STOPPED,
			playerTurn: this.config.player1,
			player1Cards: [],
			player2Cards: [],
			foundCards: [],
		};
	},

	methods: {
		startGame () {
			const cards = [];

			for (let i = 0; i < this.config.cardCount; i++) {
				const name = `${ Math.ceil((i + 1) / 2) }`;
				const id = `${ name }-${ (i + 1) % 2 ? 'a' : 'b' }`;

				cards.push({
					name,
					id,
					found: false,
				});
			}

			this.cards = shuffle(cards);

			this.playState = STATE_GAME_PLAYING;
		},

		advancePlayerTurn () {
			console.log('next player');
			this.playerTurn = this.playerTurn === this.config.player1 ? this.config.player2 : this.config.player1;
		},

		onMatch (cards) {
			cards.forEach((selectedCard) => {
				const foundCard = this.cards.find((card) => card.id === selectedCard.id);

				this.foundCards.push(foundCard);

				if (this.playerTurn === this.config.player1) {
					this.player1Cards.push(foundCard);
				} else if (this.playerTurn === this.config.player2) {
					this.player2Cards.push(foundCard);
				}
			});
		},

		onNonMatch () {
			this.advancePlayerTurn();
		},
	},

	setup() {
		const { config, cards } = GameConfig();
		const state = {
			STATE_GAME_STOPPED,
			STATE_GAME_PLAYING,
		};
		return { config, cards, state };
	}
};
</script>

<style>
.game-config {
	display: flex;
	min-height: 100vh;
	justify-content: center;
}

.gameboard {
	display: flex;
	height: 100vh;
	overflow: hidden;
}

.gameboard__cards {
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.gameboard__state {
	display: flex;
	flex: 0 1 auto;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 1rem;
}
</style>
