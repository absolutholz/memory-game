<template>
	<main>
		<div class="l-container game__config" v-if="playState === state.STATE_GAME_NOT_STARTED">
			<section class="l-center">
				<form class="l-min-width" @submit.prevent="startGame">
					<h2 class="section__hdln">Game Configuration</h2>

					<fieldset>
						<legend><svg-cards aria-hidden="true" class="icon" /> Cards</legend>

						<label class="input-group" for="card-count">
							<div class="input-label">Number</div>
							<input-number
								@update:value="(val) => config.cardCount = val"
								id="card-count"
								:max="54"
								:min="8"
								:required="true"
								:step="2"
								:value="config.cardCount * 1"
							/>
						</label>

						<label class="input-group" for="card-style">
							<div class="input-label">Style</div>
							<select
								v-model="config.cardStyle"
								class="input"
								id="card-style"
							>
								<option
									v-for="(typeConfig, index) in config.configs" :key="index"
									:value="typeConfig.id"
								>{{ typeConfig.name }}</option>
							</select>
						</label>
					</fieldset>

					<fieldset>
						<legend><svg-players aria-hidden="true" class="icon" /> Players</legend>

						<div class="player-grid">

							<label
								v-for="(player, index) in config.players" :key="index"
								class="input-group"
								for="`player-${ player.name }-name`"
							>
								<div class="input-label">
									Player {{ index + 1 }}
								</div>
								<div class="compound-input input">
									<input
										v-model="player.name"
										class="compound-input__input"
										:id="`player-${ player.name }-name`"
										min-length="2"
										max-length="20"
										required
										type="text"
									>
									<button
										v-if="config.players.length > 2"
										@click="removePlayer(player)"
										class="compound-input__suffix"
										type="button"
									><svg-player-remove aria-hidden="true" aria-label="remove player" class="icon" title="remove player" /></button>
								</div>
							</label>
						</div>

						<div class="fieldset__footer">
							<button
								@click="addPlayer"
								class="btn btn--hollow"
								:disabled="config.players.length >= 4"
								type="button"
							><svg-player-add class="icon" /> Add player</button>
						</div>
					</fieldset>

					<div class="section__footer">
						<button class="btn btn--block" type="submit"><svg-play aria-hidden="true" class="icon" /> Start game</button>
					</div>
				</form>
			</section>
		</div>

		<section
			v-if="playState === state.STATE_GAME_PLAYING || playState === state.STATE_GAME_RESTARTING || playState === state.STATE_GAME_STARTING"
			class="game__play"
		>
			<gameboard
				@do-restart-game="restartGame"
				@do-configure-new-game="endGame"
			>

				<card-list
					@on-match="onMatch"
					@on-non-match="onNonMatch"
					:cardBackSrc="cover.image.src"
					:cardBackType="cover.type"
					:cardFaceStyle="cardFaceStyle"
					:cards="cards"
					:foundCards="foundCards"
					:gameState="playState"
					:hideCardsKey="hideCardsKey"
					ref="cardListComponent"
				/>

				<template v-slot:players>

					<scoreboard-player-list :activePlayer="config.players[playerTurnIndex]" :players="config.players" />

				</template>
				<template v-slot:temporal>

					<temporal-display :secondsPlayed="secondsPlayed" :roundCount="roundCount" />

				</template>
			</gameboard>
		</section>

		<div class="l-container game__result" v-if="playState === state.STATE_GAME_OVER">
			<section class="l-center">
				<div class="l-min-width">
					<!-- <div>Game Over</div> -->

					<section class="results">
						<div class="results__head">
							<h2 class="results__hdln" v-if="winningPlayers.length > 1">It's a draw!</h2>
							<h2 class="results__hdln" v-else>{{ winningPlayers[0].name }} won!</h2>
						</div>

						<div class="results__body">
							<player-result
								v-for="(player, index) in winningPlayers" :key="index"
								:cardFaceStyle="cardFaceStyle"
								:imageIds="imageIds"
								:player="player"
							/>
						</div>
					</section>

					<section class="results" v-if="notWinningPlayers.length">
						<div class="results__head">
							<h2 class="results__hdln">Better luck next time</h2>
						</div>

						<div class="results__body">
							<player-result
								v-for="(player, index) in notWinningPlayers" :key="index"
								:cardFaceStyle="cardFaceStyle"
								:imageIds="imageIds"
								:player="player"
							/>
						</div>
					</section>

					<div>
						Rounds: {{ roundCount }}
					</div>

					<div class="section__footer">
						<button class="btn btn--block" @click="endGame"><svg-home aria-hidden="true" class="icon" /> New Game</button>
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
import InputNumber from '../components/InputNumber.vue';
import PlayerResult from './../components/PlayerResult';
import ScoreboardPlayerList from '../components/ScoreboardPlayerList.vue';
import TemporalDisplay from '../components/TemporalDisplay.vue';

import SvgCards from '@mdi/svg/svg/cards.svg';
import SvgHome from '@mdi/svg/svg/home.svg';
import SvgPlay from '@mdi/svg/svg/play-circle.svg';
import SvgPlayerAdd from '@mdi/svg/svg/account-plus.svg';
import SvgPlayerRemove from '@mdi/svg/svg/account-minus.svg';
import SvgPlayers from '@mdi/svg/svg/account-group.svg';

import shuffle from './../array-shuffle';
import Timer from './../Timer';

import colors from './../colors';

import configShapes from './../configs/shapes';
import configLetters from './../configs/letters';
import configNumbers from './../configs/numbers';
import configLegoFigures from './../configs/lego-figures';
import configLegoStarWarsFigures from './../configs/lego-star-wars-figures';

const STATE_GAME_NOT_STARTED = 'not-started';
const STATE_GAME_STARTING = 'starting';
const STATE_GAME_PLAYING = 'playing';
const STATE_GAME_RESTARTING = 'restarting';
const STATE_GAME_OVER = 'game-over';

function GameConfig () {
	const savedConfig = JSON.parse(window.localStorage.config || '{}');

	const configs = [ configShapes, configLetters, configNumbers, configLegoFigures, configLegoStarWarsFigures ];

	const config = reactive({
		cardCount: savedConfig.cardCount || 20,
		cardStyle: savedConfig.cardStyle || 'shapes',
		players: savedConfig.players || [
				{
					name: 'Player 1',
					cards: [],
				},
				{
					name: 'Player 2',
					cards: [],
				},
			],
		configs,
	});

	return { config };
}

function saveConfiguration (config = {}) {
	window.localStorage.config = JSON.stringify(config);
}

function dealCards (config, cardCount) {
	const cards = [];
	const shuffledColors = shuffle(colors);
	const cardPool = shuffle(config.images);

	for (let i = 0; i < cardCount; i++) {
		const name = `${ Math.ceil((i + 1) / 2) }`;
		const variant = (i + 1) % 2 ? 'a' : 'b';

		const cardConfig = {
			name,
			id: `${ name }-${ variant }`,
			found: false,
			color: shuffledColors[name],
			type: config.type,
			image: cardPool[name],
		};

		cards.push(cardConfig);
	}

	return shuffle(cards);
}

export default {
	name: 'Game',

	components: {
		CardList,
		Gameboard,
		InputNumber,
		PlayerResult,
		ScoreboardPlayerList,
		TemporalDisplay,

		SvgCards,
		SvgHome,
		SvgPlay,
		SvgPlayerAdd,
		SvgPlayerRemove,
		SvgPlayers,
	},

	data() {
		return {
			cards: [],
			playState: STATE_GAME_NOT_STARTED,
			playerTurnIndex: 0,
			foundCards: [],
			roundCount: 1,
			secondsPlayed: 0,
			timer: null,
			hideCardsKey: 0,
		};
	},

	computed: {
		winningPlayers () {
			let winners = [];
			this.config.players.forEach((player) => {
				if (!winners.length || player.cards.length === winners[0].cards.length) {
					winners.push(player);
				} else if (player.cards.length > winners[0].cards.length) {
					winners = [player];
				}
			});
			return winners;
		},

		notWinningPlayers () {
			return this.config.players.filter((player) => !this.winningPlayers.includes(player));
		},

		cardFaceStyle () {
			switch (this.config.cardStyle) {
				case 'shapes':
					return 'sprite';
				case 'letters':
				case 'numbers':
					return 'text';
			}

			return '';
		},

		cover () {
			return this.gameStyle.cover;
		},

		gameStyle () {
			return this.config.configs.find((config) => config.id === this.config.cardStyle);
		},
	},

	methods: {
		setGameboard () {
			this.cards = dealCards(this.gameStyle, this.config.cardCount);

			this.foundCards = [];
			this.roundCount = 1,
			this.secondsPlayed = 0;

			this.playerTurnIndex = 0;
			this.config.players.forEach((player) => {
				player.cards = [];
			});

			if (!this.timer) {
				this.timer = Timer();
				this.timer.addObserver({ update: () => {
					this.secondsPlayed += 1;
					// console.log(this.secondsPlayed);
				}});

				// window.addEventListener('blur', () => {
				// 	this.pauseGame();
				// });

				// window.addEventListener('focus', () => {
				// 	this.resumeGame();
				// });
			}
		},

		startGame () {
			this.playState = STATE_GAME_STARTING;

			saveConfiguration({
				cardStyle: this.config.cardStyle,
				cardCount: this.config.cardCount,
				players: this.config.players,
			});

			this.setGameboard();

			this.timer.start(1000);

			this.playState = STATE_GAME_PLAYING;
		},

		// pauseGame () {
		// 	console.log('pausing');
		// 	this.timer.stop();
		// 	this.playState = STATE_GAME_PAUSED;
		// },

		// resumeGame () {
		// 	console.log('resuming');
		// 	this.timer.start();
		// 	this.playState = STATE_GAME_PLAYING;
		// },

		restartGame () {
			this.playState = STATE_GAME_RESTARTING;

			this.hideCardsKey = Math.random();

			setTimeout(() => {
				this.setGameboard();

				this.timer.start(1000);

				this.playState = STATE_GAME_PLAYING;
			}, 250);
		},

		endGame () {
			this.timer.stop();
			this.playState = STATE_GAME_NOT_STARTED;
		},

		advancePlayerTurn () {
			this.playerTurnIndex = this.playerTurnIndex < this.config.players.length - 1 ? this.playerTurnIndex + 1 : 0;
			if (this.playerTurnIndex === 0) {
				this.roundCount += 1;
			}
		},

		onMatch (cards) {
			const currentPlayerCards = this.config.players[this.playerTurnIndex].cards;

			cards.forEach((selectedCard) => {
				const foundCard = this.cards.find((card) => card.id === selectedCard.id);
				this.foundCards.push(foundCard);
				currentPlayerCards.push(foundCard);
			});

			if (this.foundCards.length === this.config.cardCount * 1) {
				this.timer.stop();
				setTimeout(() => {
					this.playState = STATE_GAME_OVER;
				}, 2500);
			}
		},

		onNonMatch () {
			this.advancePlayerTurn();
		},

		addPlayer () {
			this.config.players.push({
				name: `Player ${ this.config.players.length + 1 }`,
				cards: [],
			});
		},

		removePlayer (playerToRemove) {
			const indexToRemove = this.config.players.findIndex((player) => player === playerToRemove);
			this.config.players.splice(indexToRemove, 1);
		},
	},

	setup() {
		const { config } = GameConfig();
		const state = {
			STATE_GAME_STARTING,
			STATE_GAME_RESTARTING,
			STATE_GAME_NOT_STARTED,
			STATE_GAME_PLAYING,
			STATE_GAME_OVER,
		};
		return { config, state };
	}
};
</script>

<style lang="scss">
.game {
	&__config {
		background: var(--color-background);
	}

	&__play {
		background: var(--color-background);
		position: relative;
	}

	&__result {
		background: var(--color-background);
	}
}

.scoreboard {
	&__buttons {
		font-size: var(--typo-size-micro);
		margin-top: auto;

		.btn {
			margin-top: var(--spacing-mini);
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

.mini-card-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	list-style: none;
	margin: 0;
	padding-left: 0;

	&__item {
		height: 50px;
		margin: var(--spacing-mini);
		position: relative;
		width: 50px;
	}
}

.results {
	align-items: center;
	border: 4px solid #444;
	border-radius: 4rem 4rem 1rem 1rem;
	display: flex;
	flex-direction: column;
	margin: var(--spacing-macro) 0;
	padding: 2rem;

	&__head {
		background: var(--color-background);
		line-height: 1;
		margin: -3rem 0 var(--spacing-mega);
		padding: 0 var(--spacing-base);
	}

	&__body {
		display: flex;
		flex-wrap: wrap;

		> * {
			flex: 1 1 25rem;
			margin: var(--spacing-mega);
		}
	}

	&__hdln {
		background: var(--color-background);
		font-size: var(--typo-size-macro);
		line-height: 1;
		margin: -0.25em 0 0;
		text-align: center;
	}
}

.player-grid {
	display: grid;
	grid-auto-rows: 1fr;
	grid-gap: var(--spacing-base) var(--spacing-base);
	grid-template-columns: repeat(auto-fill, minmax(clamp(50% #{"-"} var(--spacing-base), 25ch, 100%), 1fr));
	margin: var(--spacing-base) 0;

	> * {
		margin: 0;
	}
}
</style>
