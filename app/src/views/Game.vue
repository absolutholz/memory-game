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
							<button class="input" disabled>Shapes & Colors</button>
						</div>
					</fieldset>

					<fieldset>
						<legend>Players</legend>

						<label
							v-for="(player, index) in config.players" :key="index"
							class="input-group"
							for="`player-${ player.name }-name`"
						>
							<div class="input-label">Player {{ index + 1 }} name</div>
							<input class="input" v-model="player.name" :id="`player-${ player.name }-name`" required type="text">
						</label>

						<div class="fieldset__footer">
							<button
								@click="addPlayer"
								class="btn btn--block btn--hollow"
								type="button"
							>Add player</button>
						</div>
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
						<li v-for="(player, index) in config.players" :key="index">
							<player-score
								:foundCards="player.cards"
								:isActive="playerTurnIndex === index"
								:name="player.name"
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

					<h2 v-if="winningPlayers.length > 1">It's a draw!</h2>
					<h2 v-else>{{ winningPlayers[0].name }} won!</h2>

					<figure>
						<ul class="mini-card-list">
							<!-- <li
								v-for="(cardGroup, cardGroupIndex) in winningPlayerCardGroups" :key="cardGroupIndex"
								class="mini-card-list__item"
							>
								<mini-card
									v-for="(card, index) in cardGroup" :key="index"
									:color="card.color"
								>
									<svg class="mini-card__image mini-card__image--svg">
										<use :href="`/shapes.svg#${ imageIds[card.name] }`"></use>
									</svg>
								</mini-card>
							</li> -->
						</ul>
						<!-- <figcaption>{{ player1Cards.length }} Cards</figcaption> -->
					</figure>

					<!-- <div>
						<div>{{ config.player2 }}</div>
						<div>{{ player2Cards.length }}</div>
					</div> -->

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
// import MiniCard from './../components/MiniCard';
import PlayerScore from './../components/PlayerScore';

import colors from './../colors';
import imageIds from './../shapes';
import shuffle from './../array-shuffle';

const STATE_GAME_NOT_STARTED = 'not-started';
const STATE_GAME_PLAYING = 'playing';
const STATE_GAME_OVER = 'game-over';

function GameConfig () {
	const  config = reactive({
		cardCount: 20,
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
		// MiniCard,
		PlayerScore,
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
				console.log("XXX", winners[0], player);
				if (!winners.length || player.cards.length === winners[0].cards.length) {
					winners.push(player);
				} else if (player.cards.length > winners[0].cards.length) {
					winners = [player];
				}
			});
			return winners;
		},

		// winningPlayerCardGroups () {
		// 	const cards = {};
		// 	(this.player1Cards.length > this.player2Cards.length ? this.player1Cards : this.player2Cards).forEach((card) => {
		// 		if (!cards[card.name]) {
		// 			cards[card.name] = [];
		// 		}
		// 		cards[card.name].push(card);
		// 	});

		// 	return cards;
		// }
	},

	methods: {
		startGame () {
			const cards = [];
			const shuffledColors = shuffle(colors);

			for (let i = 0; i < this.config.cardCount; i++) {
				const name = `${ Math.ceil((i + 1) / 2) }`;
				const id = `${ name }-${ (i + 1) % 2 ? 'a' : 'b' }`;

				cards.push({
					name,
					id,
					found: false,
					color: shuffledColors[name],
				});
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
			console.log('next player');
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
	flex-wrap: wrap;
	justify-content: center;
	list-style: none;
	margin: 0;
	padding-left: 0;

	&__item {
		height: 50px;
		margin: var(--spacing-micro);
		position: relative;
		width: 50px;
	}
}
</style>
