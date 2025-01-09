<script>
import GamesListComponent from '../components/dashboard/GamesListComponent.vue';
import { games } from '@/services/DataProvider';

export default {
  data() {
    return {
      games: [],
    };
  },
  components: {
    GamesListComponent,
  },
  methods: {
    // Récupère la liste des parties depuis l'API
    async fetchGames() {
      try {
        const response = await games();
        this.games = response.data;
        console.log('Games fetched successfully:', this.games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },

    displayInfos() {
      console.log(this.games);
    },
  },
  mounted() {
    this.fetchGames();
  },
};
</script>

<template>
  <h1>Dashboard</h1>
  <p>Waiting Games :</p>
  <button @click="createNewGame">Create New Game</button>
  <button>Profile</button>

  <GamesListComponent :games="games" />
</template>
