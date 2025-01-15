<script>
import DashboardComponent from '@/components/dashboard/DashboardComponent.vue';
import GamesListComponent from '../components/dashboard/GamesListComponent.vue';
import { games, games_add } from '@/services/DataProvider';

export default {
  data() {
    return {
      games: [],
    };
  },
  components: {
    DashboardComponent,
    GamesListComponent,
  },
  methods: {
    // Récupère la liste des parties depuis l'API
    async fetchGames() {
      try {
        const response = await games();
        this.games = response
        console.log('Games fetched successfully:', this.games);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },

    async createNewGame() {
            try{
                await games_add();
                this.fetchGames();
            } catch(e){
                console.error(e);
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
  <h1>Tic tac toe</h1>
  <DashboardComponent />
  <p>Waiting Games :</p>
  <button @click="createNewGame">Create New Game</button>
  <button>Profile</button>

  <GamesListComponent :games="games" />
</template>