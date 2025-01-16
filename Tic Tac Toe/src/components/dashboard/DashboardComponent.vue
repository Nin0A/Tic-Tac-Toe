<script>
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
    <h3>Games Dashboard of {{ username }} </h3>
  </div>
  <button @click="logout">Logout</button>
</template>