<script>
import '../../assets/css/STYLE_DashboardComponent.css';
import { getUserIdentity, removeToken } from '@/services/Authprovider.js';
export default {
  data() {
    return {
      username: getUserIdentity().username,
    };
  },
  methods: {
    logout() {
      removeToken();
      if(localStorage.getItem('user'))
      localStorage.removeItem('user');
      this.$router.push({ name: 'login' });
    },
  },
};

</script>

<template>
  <div>
    <h3>Dashboard of {{ username }} </h3>
  </div>

  <div class="button-container">
    <button @click="logout">Logout</button>
    <router-link to="/profile">
          <button>Profile</button>
        </router-link>
  </div>
</template>