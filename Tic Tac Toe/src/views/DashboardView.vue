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
  components: {
    GamesListComponent,
  },
  methods: {
    displayInfos() {
      console.log(this.games);
    }
  }
}

</script>

<template>
  <h1>Dashboard</h1>
  <p>Waiting Games :</p>

  <GamesListComponent :games="games" />

</template>
