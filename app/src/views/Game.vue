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
							<select v-model="config.cardStyle" class="input">
								<option value="shapes">Shapes & Colors</option>
								<option value="letters">Letters</option>
								<option value="numbers">Numbers</option>
							</select>
						</div>
					</fieldset>

					<fieldset>
						<legend><svg-players aria-hidden="true" class="icon" /> Players</legend>

						<label
							v-for="(player, index) in config.players" :key="index"
							class="input-group"
							for="`player-${ player.name }-name`"
						>
							<div class="input-label">
								Player {{ index + 1 }}
								<button
									v-if="config.players.length > 2"
									@click="removePlayer(player)"
									class="btn btn--small btn--hollow"
									type="button"
								><svg-player-remove aria-hidden="true" aria-label="remove player" class="icon" title="remove player" /></button>
							</div>
							<input
								v-model="player.name"
								class="input"
								:id="`player-${ player.name }-name`"
								min-length="2"
								max-length="20"
								required
								type="text"
							>
						</label>

						<div class="fieldset__footer" v-if="config.players.length < 4">
							<button
								@click="addPlayer"
								class="btn btn--hollow"
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
			v-if="playState === state.STATE_GAME_PLAYING"
			class="game__play"
		>
			<gameboard>
				<template v-slot:cards>

					<card-list
						@on-match="onMatch"
						@on-non-match="onNonMatch"
						:cardFaceStyle="cardFaceStyle"
						:cards="cards"
						:foundCards="foundCards"
					/>

				</template>
				<template v-slot:score>

					<ol class="scoreboard__player-list">
						<li v-for="(player, index) in config.players" :key="index">
							<player-score
								:foundCards="player.cards"
								:isActive="playerTurnIndex === index"
								:name="player.name"
							/>
						</li>
					</ol>

					<div class="scoreboard__buttons">
						<button @click="startGame" class="btn btn--block btn--hollow" type="button"><svg-restart aria-hidden="true" class="icon" /> Restart</button>
						<button class="btn btn--block btn--hollow" @click="reset"><svg-home aria-hidden="true" class="icon" /> New</button>
					</div>

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

					<div class="section__footer">
						<button class="btn btn--block" @click="reset"><svg-home aria-hidden="true" class="icon" /> New Game</button>
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
import PlayerResult from './../components/PlayerResult';
import PlayerScore from './../components/PlayerScore';

import colors from './../colors';
import imageIds from './../shapes';
import letters from './../letters';
import shuffle from './../array-shuffle';

import SvgCards from '@mdi/svg/svg/cards.svg';
import SvgHome from '@mdi/svg/svg/home.svg';
import SvgPlay from '@mdi/svg/svg/play-circle.svg';
import SvgPlayerAdd from '@mdi/svg/svg/account-plus.svg';
import SvgPlayerRemove from '@mdi/svg/svg/account-minus.svg';
import SvgPlayers from '@mdi/svg/svg/account-group.svg';
import SvgRestart from '@mdi/svg/svg/restart.svg';

const STATE_GAME_NOT_STARTED = 'not-started';
const STATE_GAME_PLAYING = 'playing';
const STATE_GAME_OVER = 'game-over';

function GameConfig () {
	const  config = reactive({
		cardCount: 20,
		cardStyle: 'shapes',
		players: [
			{
				name: 'Player 1',
				cards: [],
			},
			{
				name: 'Player 2',
				cards: [],
			},
		],
	});

	return { config };
}

export default {
	name: 'Game',

	components: {
		CardList,
		Gameboard,
		PlayerResult,
		PlayerScore,

		SvgCards,
		SvgHome,
		SvgPlay,
		SvgPlayerAdd,
		SvgPlayerRemove,
		SvgPlayers,
		SvgRestart,
	},

	data() {
		return {
			cards: [],
			playState: STATE_GAME_NOT_STARTED,
			playerTurnIndex: 0,
			foundCards: [],
			imageIds: shuffle(imageIds),
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
	},

	methods: {
		startGame () {
			const cards = [];
			const shuffledColors = shuffle(colors);

			for (let i = 0; i < this.config.cardCount; i++) {
				const name = `${ Math.ceil((i + 1) / 2) }`;
				const variant = (i + 1) % 2 ? 'a' : 'b';
				const id = `${ name }-${ variant }`;

				const config = {
					name,
					id,
					found: false,
					color: shuffledColors[name],
				};

				if (this.config.cardStyle === 'numbers') {
					config.text = name;
				}

				if (this.config.cardStyle === 'letters') {
					config.text = variant === 'a' ? letters[name] : letters[name].toUpperCase();
				}

				if (this.config.cardStyle === 'shapes') {
					config.spriteId = imageIds[name];
				}

				cards.push(config);
			}

			this.cards = shuffle(cards);
			this.foundCards = [];

			this.playerTurnIndex = 0;
			this.config.players.forEach((player) => {
				player.cards = [];
			});

			this.playState = STATE_GAME_PLAYING;
		},

		advancePlayerTurn () {
			this.playerTurnIndex = this.playerTurnIndex < this.config.players.length - 1 ? this.playerTurnIndex + 1 : 0;
		},

		onMatch (cards) {
			const currentPlayerCards = this.config.players[this.playerTurnIndex].cards;

			cards.forEach((selectedCard) => {
				const foundCard = this.cards.find((card) => card.id === selectedCard.id);
				this.foundCards.push(foundCard);
				currentPlayerCards.push(foundCard);
			});

			if (this.foundCards.length === this.config.cardCount * 1) {
				this.playState = STATE_GAME_OVER;
			}
		},

		onNonMatch () {
			this.advancePlayerTurn();
		},

		reset () {
			this.playState = STATE_GAME_NOT_STARTED;
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
	&__player-list {
		display: flex;
		flex-direction: inherit;
		flex-wrap: wrap;
		list-style: none;
		justify-content: center;
		margin: calc(-1 * var(--spacing-mini));
		margin-top: auto;
		padding-left: 0;

		> li {
			margin: var(--spacing-mini);
		}
	}

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
</style>
