<script>
import DashboardComponent from '@/components/dashboard/DashboardComponent.vue';
import GamesListComponent from '../components/dashboard/GamesListComponent.vue';
import '../assets/css/STYLE_DashboardView.css';
import { getUserIdentity } from '@/services/Authprovider.js';
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
        this.games = response;


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
    handleGameDeleted(gameId) {
      this.games = this.games.filter(game => game.id !== gameId);
    },
    refresh() {
      this.fetchGames();
    }
  },
  mounted() {
    this.fetchGames();
  },
};
</script>

<template>
  <header>
    <h1>Tic tac toe</h1>
    <DashboardComponent />
  </header>
  <div id="dashboard-container">
     <p>Waiting Games :</p>
     <div class="dashboard-buttons">
      <button @click="createNewGame">Create New Game</button>
      <button @click="refresh">Refresh</button>

     
     </div>
  </div>
 

  <GamesListComponent :games="games"  @gameDeleted="handleGameDeleted"  />
</template>