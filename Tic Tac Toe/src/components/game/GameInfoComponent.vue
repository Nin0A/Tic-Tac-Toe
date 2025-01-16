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
    };
  },
  watch: {
    gameState: {
      immediate: true,
      handler(newGameState) {
        if (newGameState && newGameState.currentPlayer) {
          this.updateCurrentPlayerName(newGameState.currentPlayer);
        }
      },
    },
  },
  methods: {
    async updateCurrentPlayerName(playerId) {
      try {
        const currentPlayer = await getUser(playerId);
        this.currentPlayerName = currentPlayer.username;
      } catch (error) {
        console.error('Error fetching current player name:', error);
        this.currentPlayerName = null;
      }
    },
  },
};
</script>

<template>
  <div class="game-info">
    <h2 v-if="gameState && gameState.id">Game ID: {{ gameState.id }}</h2>
    <p v-if="playerNames && playerNames.player1">Player 1: {{ playerNames.player1 }}</p>
    <p>Player 2: {{ playerNames.player2 || 'Waiting for player 2...' }}</p>
    <p v-if="gameState && gameState.status === 'in_progress'">Current Player: {{ currentPlayerName }}</p>
    <p v-if="gameState && gameState.status === 'finished'">Winner: {{ gameState.winner }}</p>
    <p v-if="gameState && gameState.status === 'draw'">Game ended in a draw</p>
  </div>
</template>

<style>
.game-info {
  margin-bottom: 20px;
}
</style>