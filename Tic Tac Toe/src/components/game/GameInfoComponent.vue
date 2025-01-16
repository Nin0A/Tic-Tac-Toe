<script>
import { getUser } from '@/services/DataProvider.js';
export default {
  props: {
    gameState: {
      type: Object,
      required: true,
    },
    playerNames: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentPlayerName: null,
      winnerName: null,
    };
  },
  watch: {
    gameState: {
      immediate: true,
      handler(newGameState) {
        if (newGameState) {
          if (newGameState.currentPlayer) {
            this.updatePlayerName(newGameState.currentPlayer, 'currentPlayerName');
          }
          if (newGameState.winner) {
            this.updatePlayerName(newGameState.winner, 'winnerName');
          }
        }
      },
    },
  },
  methods: {
    async updatePlayerName(playerId, target) {
      try {
        const player = await getUser(playerId);
        this[target] = player.username;
      } catch (error) {
        console.error(`Error fetching player name for ${target}:`, error);
        this[target] = null;
      }
    },
  },
};
</script>

<template>
  <div class="game-info">
    <h2 v-if="gameState && gameState.id">Game ID: {{ gameState.id }}</h2>
    <p v-if="playerNames && playerNames.player1">Player 1: {{ playerNames.player1 }} ( X )</p>
    <p>Player 2: {{ playerNames.player2 || 'Waiting for player 2...' }}</p>
    <p v-if="gameState && gameState.status === 'in_progress'">Current Player: {{ currentPlayerName }}</p>
    <p v-if="gameState && gameState.status === 'finished'">Winner: {{ winnerName }}</p>
    <p v-if="gameState && gameState.status === 'draw'">Game ended in a draw</p>
  </div>
</template>

<style>
.game-info {
  margin-bottom: 20px;
}
</style>