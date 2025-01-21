<script>
import GameBoardComponent from '@/components/game/GameBoardComponent.vue';
import GameInfoComponent from '@/components/game/GameInfoComponent.vue';
import { getUserIdentity } from '@/services/Authprovider.js';
import { getGame, getUser, joinGame, makeMove } from '@/services/DataProvider.js';

export default {
  data() {
    return {
      gameId: this.$route.params.gameId,
      gameState: null,
      board: Array(3).fill(null).map(() => Array(3).fill(null)),
      currentPlayer: null,
      winner: null,
      error: null,
      userId: getUserIdentity().id,
      polling: null,
      playerNames: {
        player1: null,
        player2: null,
      },
    };
  },
  components: {
    GameBoardComponent,
    GameInfoComponent,
  },
  methods: {
    async fetchGameState() {
      try {
        const game = await getGame(this.gameId);
        if (!game) {
          throw new Error('Game not found');
        }
        this.gameState = game;
        console.log(this.gameState);
        this.board = this.formatBoard(game.board);
        this.currentPlayer = game.currentPlayer;
        this.winner = game.winner;

        const player1Name = await getUser(this.gameState.player1);
        this.playerNames.player1 = player1Name.username;

        if (game.player2) {
          const player2Name = await getUser(this.gameState.player2);
          this.playerNames.player2 = player2Name.username;
        } else {
          this.playerNames.player2 = null;
        }
      } catch (error) {
        this.error = error.message;
        this.$router.push({ name: 'dashboard' });
      }
    },
    formatBoard(flatBoard) {
      return [
        [flatBoard[0], flatBoard[1], flatBoard[2]],
        [flatBoard[3], flatBoard[4], flatBoard[5]],
        [flatBoard[6], flatBoard[7], flatBoard[8]],
      ];
    },
    startPolling() {
      if (this.polling) return;
      this.polling = setInterval(this.fetchGameState, 2000); // Poll every 10 seconds
    },
    stopPolling() {
      if (this.polling) {
        clearInterval(this.polling);
        this.polling = null;
      }
    },
    async joinGame() {
      try {
        await joinGame(this.gameId);
        await this.fetchGameState();
      } catch (error) {
        this.error = error.message;
      }
    },
    async handleMove(row, col) {
      try {
        await makeMove(this.gameId, row, col);
        await this.fetchGameState();
      } catch (error) {
        this.error = error.message;
      }
    }
  },
  async created() {
    await this.fetchGameState();
    this.startPolling();
  },
  beforeUnmount() {
    this.stopPolling();
  },
};
</script>

<template>
  <div>
    <GameInfoComponent :gameState="gameState" :playerNames="playerNames" />
    <GameBoardComponent :board="board" :currentPlayer="currentPlayer" :userId="userId" :player1="gameState.player1" 
      :player2="gameState.player2" 
      :winner="winner" @cell-clicked="handleMove"/>
    <div class="join-button">
      <button v-if="gameState && !gameState.player2 && gameState.creator !== userId" @click="joinGame">Join Game</button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <router-link to="/">
      <div class="back-button">
        <button>Back to Dashboard</button>
      </div>
    </router-link>
  </div>
</template>


<style>

.back-button{

  display: flex;
  justify-content: center;
}

.back-button>button{
    background-color: #b61921;
    color: white;
    padding: 12px 20px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: max-content;
    align-self: center;
    text-decoration: none;
}

.back-button>button:hover{
  background-color: #640f13;
}

.join-button{
  margin-top: 1em;
  display: flex;
  justify-content: center;
}


</style>