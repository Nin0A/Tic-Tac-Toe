<script>
import GamesListComponent from '../components/dashboard/GamesListComponent.vue';
import { games_add, games_get } from '@/services/DataProvider';

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
        const response = await games_get();
        this.games = response.data;
        console.log('Games fetched successfully:', this.games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },

    // Ajoute une nouvelle partie via l'API
    async createNewGame() {
    try {
      const newGame = {
        id: "uuid",
        creator: "uuid",
        player1: "uuid",
        player2: null,
        board: Array(9).fill(null),
        status: "waiting",
        currentPlayer: "uuid",
      };

      const response = await games_add(newGame);
      console.log('Game added successfully:', response);
      this.fetchGames();
    } catch (error) {
      console.error('Error adding new game:', error);
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
