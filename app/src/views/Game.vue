<template>
	<main class="l-container">
		<section class="l-center" v-if="playState === state.STATE_GAME_NOT_STARTED">
			<form class="l-min-width" @submit.prevent="startGame">
				<h2 class="section__hdln">Game Configuration</h2>

				<fieldset>
					<legend>Cards</legend>

					<label class="input-group" for="card-count">
						<div class="input-label">Number</div>
						<input
							class="input"
							id="card-count"
							max="54"
							min="8"
							required step="2"
							type="number"
							v-model="config.cardCount"
						>
					</label>

					<div class="input-group">
						<div class="input-label">Style</div>
						<button class="input" disabled>Shapes</button>
					</div>
				</fieldset>

				<fieldset>
					<legend>Players</legend>

					<label class="input-group" for="player-1-name">
						<div class="input-label">Player 1</div>
						<input class="input" v-model="config.player1" id="player-1-name" required type="text">
					</label>

					<label class="input-group" for="player-2-name">
						<div class="input-label">Player 2</div>
						<input class="input" v-model="config.player2" id="player-2-name" required type="text">
					</label>
				</fieldset>

				<div class="section__footer">
					<button class="btn btn--block" type="submit">Start game</button>
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
					:imageIds="imageIds"
				/>
			</section>
			<section class="gameboard__state">
				<ol class="scoreboard__player-list">
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

		<section class="l-center" v-if="playState === state.STATE_GAME_OVER">
			<div class="l-min-width">
				<div>Game Over</div>
				<h2 v-if="player1Cards.length === player2Cards.length">It's a draw!</h2>
				<h2 v-else>{{ winningPlayer }} won!</h2>

				<div>
					<div>
						<div>{{ config.player1 }}</div>
						<div>{{ player1Cards.length }}</div>
					</div>
					<div></div>
					<div>
						<div>{{ config.player2 }}</div>
						<div>{{ player2Cards.length }}</div>
					</div>
				</div>

				<div class="section__footer">
					<button class="btn btn--block" @click="reset">New Game</button>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import { reactive } from "vue";

import CardList from './../components/CardList';
import PlayerScore from './../components/PlayerScore';

import imageIds from './../shapes';
import shuffle from './../array-shuffle';

const STATE_GAME_NOT_STARTED = 'not-started';
const STATE_GAME_PLAYING = 'playing';
const STATE_GAME_OVER = 'game-over';

function GameConfig () {
	let config = reactive({
		cardCount: 20,
		player1: 'Player 1',
		player2: 'Player 2',
	});

	const cards = [];

  return { config, cards };
}

export default {
	name: 'Game',

	components: {
		CardList,
		PlayerScore,
	},

	data() {
		return {
			playState: STATE_GAME_NOT_STARTED,
			playerTurn: this.config.player1,
			player1Cards: [],
			player2Cards: [],
			foundCards: [],
			imageIds: shuffle(imageIds),
		};
	},

	computed: {
		winningPlayer () {
			return this.player1Cards.length > this.player2Cards.length ? this.config.player1 : this.config.player2;
		},
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

			this.playerTurn = this.config.player1;
			this.player1Cards = [];
			this.player2Cards = [];
			this.foundCards = [];

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

				if (this.foundCards.length === this.config.cardCount * 1) {
					this.playState = STATE_GAME_OVER;
				}
			});
		},

		onNonMatch () {
			this.advancePlayerTurn();
		},

		reset () {
			this.playState = STATE_GAME_NOT_STARTED;
		},
	},

	setup() {
		const { config, cards } = GameConfig();
		const state = {
			STATE_GAME_NOT_STARTED,
			STATE_GAME_PLAYING,
			STATE_GAME_OVER,
		};
		return { config, cards, state };
	}
};
</script>

<style lang="scss">
.gameboard {
	display: flex;
	height: calc(100vh - 2rem);
	overflow: hidden;

	&__cards {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	&__state {
		display: flex;
		flex: 0 1 auto;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-left: 1rem;
		min-width: 10vw;
	}
}

.scoreboard__player-list {
	list-style: none;
	margin: 0;
	padding-left: 0;

	> li {
		+ li {
			margin-top: 1rem;
		}
	}
}

.game-config form {
	width: Min(100%, 25rem);
}

.input-group {
	display: block;
	width: 100%;
}
</style>
