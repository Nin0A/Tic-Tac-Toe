<script>

import GamesListComponent from '../components/dashboard/GamesListComponent.vue';


export default {

  data() {
    return {
      games: [
        {
          playerName: "Alice",
          date: "2024-12-10"
        },
        {
          playerName: "Bob",
          date: "2024-12-11"
        },
        {
          playerName: "Charlie",
          date: "2024-12-12"
        }
      ],
    }
  },
  component: {
    GamesListComponent,
  }
}

</script>

<template>
  <h1>Dashboard</h1>
  <p>Waiting Games : </p>
  <GameListComponent :games="games" />

</template>
