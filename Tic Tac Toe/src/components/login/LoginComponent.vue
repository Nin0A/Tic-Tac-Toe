<script>
import { login } from '@/services/DataProvider.js';
export default {
    data() {
        return {
            username: '',
            password: '',
            error: null
        }
    },

    methods: {
        async handleLogin() {
            try {
                const respone = await login(this.username, this.password);
                localStorage.setItem('user', JSON.stringify(this.username));
                localStorage.setItem('token', respone.token);
                this.$router.push('/');
            } catch (e) {
                this.error = e;
            }
        }
    }
}
</script>
<template> 
    <div>
        <h1>Login</h1>
        <p>Login to your account</p>
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button @click="handleLogin">Login</button>
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
        <p v-if="error" style="color: red">{{ error }}</p>
    </div>
</template>