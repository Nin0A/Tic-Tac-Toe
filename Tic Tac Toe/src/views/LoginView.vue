<script>
console.log("LoginView.vue");
</script>
<template>
    <div>
        <h1>Login</h1>
        <p>Enter </p>
        <input type="text" v-model="name" placeholder="Enter your name">
        <router-link to="/dashboard">Start Game</router-link>
    </div>
</template>