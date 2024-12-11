<script>
</script>
<template>
  <div>
    <h1>Register</h1>
    <p>Enter your name to start the game</p>
    <input type="text" v-model="name" placeholder="Enter your name">
    <router-link to="/dashboard">Start Game</router-link>
  </div>
</template>