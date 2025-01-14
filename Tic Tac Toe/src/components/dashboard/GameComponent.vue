<script>

import '../../assets/css/STYLE_GameComponent.css';


export default {

  props: {
    game: {
      type: Object,
      Required: true,

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
      <button class="play-button">Play</button>
      <button class="delete-button">Delete</button>
    </div>

  </article>

</template>