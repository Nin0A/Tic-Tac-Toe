<script>

import GameComponent from './GameComponent.vue';
import '../../assets/css/STYLE_GamesListComponent.css';

export default {

  props: {
    games: {
      type: Array,
      required: true,
    },
  },
  components: {
    GameComponent,
  },
  methods: {
    displayInfos() {
      console.log(this.games);
    }
  }
}

</script>

<template>
  <div class="game-list">
    <GameComponent 
      v-for="game in games" 
      :key="game.id" 
      :game="game" 
    />
  </div>
</template>
