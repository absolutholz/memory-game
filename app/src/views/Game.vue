<template>
	<main>
		<div class="l-container" v-if="playState === state.STATE_GAME_NOT_STARTED">
			<section class="l-center">
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
		</div>

		<section v-if="playState === state.STATE_GAME_PLAYING">
			<gameboard>
				<template v-slot:cards>

					<card-list
						@on-match="onMatch"
						@on-non-match="onNonMatch"
						:cards="cards"
						:foundCards="foundCards"
						:imageIds="imageIds"
					/>

				</template>
				<template v-slot:score>

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

				</template>
			</gameboard>
		</section>

		<div class="l-container" v-if="playState === state.STATE_GAME_OVER">
			<section class="l-center">
				<div class="l-min-width">
					<div>Game Over</div>
					<h2 v-if="player1Cards.length === player2Cards.length">It's a draw!</h2>
					<h2 v-else>{{ winningPlayer }} won!</h2>

					<figure>
						<div class="mini-card-list">
							<div
								v-for="(cardGroup, cardGroupIndex) in winningPlayerCardGroups" :key="cardGroupIndex"
								class="mini-card-group"
							>
								<div
									v-for="(card, index) in cardGroup" :key="index"
									class="mini-card"
									:style="`transform: rotate(${ (Math.random() * 10) * (Math.random() > 0.5 ? -1 : 1) }deg);`"
								>
									<svg class="mini-card__image mini-card__image--svg">
										<use :href="`/shapes.svg#${ imageIds[card.name] }`"></use>
									</svg>
								</div>
							</div>
						</div>
						<figcaption>{{ player1Cards.length }} Cards</figcaption>
					</figure>

					<div>
						<div>{{ config.player2 }}</div>
						<div>{{ player2Cards.length }}</div>
					</div>

					<div class="section__footer">
						<button class="btn btn--block" @click="reset">New Game</button>
					</div>
				</div>
			</section>
		</div>
	</main>
</template>

<script>
import { reactive } from "vue";

import CardList from './../components/CardList';
import Gameboard from './../components/Gameboard';
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
		Gameboard,
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

		winningPlayerCardGroups () {
			const cards = {};
			(this.player1Cards.length > this.player2Cards.length ? this.player1Cards : this.player2Cards).forEach((card) => {
				if (!cards[card.name]) {
					cards[card.name] = [];
				}
				cards[card.name].push(card);
			});

			return cards;
		}
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
.scoreboard__player-list {
	display: flex;
	flex-direction: inherit;
	flex-wrap: wrap;
	list-style: none;
	justify-content: center;
	margin: calc(-1 * var(--spacing-mini));
	padding-left: 0;

	> li {
		margin: var(--spacing-mini);
	}
}

.game-config form {
	width: Min(100%, 25rem);
}

.input-group {
	display: block;
	width: 100%;
}

.mini-card-list {
	display: flex;
	justify-content: center;;
}

.mini-card-group {
	height: 50px;
	margin: 0 var(--spacing-micro);
	position: relative;
	width: 50px;
}

.mini-card {
	background: white;
	border-radius: 4px;
	box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;

	&__image {
		height: 80%;
		left: 10%;
		object-fit: contain;
		position: absolute;
		top: 10%;
		width: 80%;
		z-index: 0;
	}

	// &:nth-child(even) {
	// 	top: 20%;
	// 	left: 20%;
	// }
}
</style>
