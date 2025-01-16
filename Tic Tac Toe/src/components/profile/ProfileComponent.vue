<script>
import { getUserIdentity, setToken, removeToken } from '@/services/Authprovider.js';
import { getUser, updateUser } from '@/services/DataProvider.js';

export default {
    data() {
    return {
      newUsername: '',
      user: null,
      newPassword: '',
      error: null,
    };
  },
  methods: {
    async updateUser() {
      try {
          try {
            const userId = getUserIdentity().id;
            const user = await getUser(userId);
            this.user = user;
            console.log(this.user);

            if (this.user) {
              const response = await updateUser(this.newUsername, this.newPassword);
              setToken(response.user.token);
              this.$router.push({ name: 'dashboard' });
            }
          } catch (e) {
            this.error = e.message;
            console.error(e);
          }
      } catch (e) {
        this.error = e.message;
        console.error(e);
      }
    },
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
    <h1>Profile</h1>
    <h3>Here you can update your profile</h3>
    <router-link to="/">
      <button>Return</button>
    </router-link>
    <button @click="logout">Logout</button>
  </div>

  <div class="form-container">
    <form @submit.prevent="updateUser">
      <label>Username</label>
      <input v-model="newUsername" type="text" placeholder="Username" />
      <label>Password</label>
      <input v-model="newPassword" type="password" placeholder="Password" />
      <button type="submit">Update</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>