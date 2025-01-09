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
      <h2>{{ game.playerName }}</h2>
      <h3>{{ game.date }}</h3>
    </div>
    <div class="buttons">
      <button>Play</button>
      <button>Delete</button>
    </div>

  </article>

</template>
