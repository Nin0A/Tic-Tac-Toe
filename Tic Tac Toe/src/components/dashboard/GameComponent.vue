<script>

import '../../assets/css/STYLE_GameComponent.css';


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
      <button class="delete-button">Delete</button>
    </div>

  </article>

</template>