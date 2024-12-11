<script>

import GameComponent from './GameComponent.vue';

export default {

  props: {
    games: {
      type: Array,
      Required: true,
    },
  },
  component: {
    GameComponent,
  }
}

</script>

<template>
  <div v-for="game in games" :key="game">
    <GameComponent :game="game" />
  </div>
</template>
