<script>

import '../../assets/css/STYLE_GameComponent.css';
import { deleteGame } from '@/services/DataProvider.js';


export default {

  props: {
    game: {
      type: Object,
      Required: true,
    },
  },
  methods: {
    playGame() {
      this.$router.push({ name: 'gameboard', params: { gameId: this.game.id } });
    },
    async deleteGame() {
      try {
        await deleteGame(this.game.id);
        this.$emit('game-deleted', this.game.id);
      } catch (error) {
        console.error('Error deleting game:', error);
      }
      
    },
  },
}

</script>

<template>

  <article class="game">
    <div>
      <h2>Game: {{ game.id }}</h2>
      <h3 class="status">Status: {{ game.status }}</h3>
    </div>
    <div class="buttons">
      <button class="play-button" @click="playGame">Play</button>
      <button class="delete-button" @click="deleteGame">Delete</button>
    </div>

  </article>

</template>