<script>
import { login } from '@/services/DataProvider.js';
import { setToken } from '@/services/Authprovider';
import '../../assets/css/STYLE_RegisterComponent.css';

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
                setToken(respone.token);
                this.$router.push('/');
            } catch (e) {
                this.error = e;
            }
        }
    }
}
</script>
<template> 
    <div class="container">
    <div class="register-container">
        <h1 class="register-title">Login</h1>
        <p class="register-subtitle">Login to your account</p>

        <input v-model="username" type="text" class="register-input" placeholder="Username" />
        <input v-model="password" type="password" class="register-input" placeholder="Password" />

        <button @click="handleLogin" class="register-button">Login</button>

        <p class="register-login-prompt">Don't have an account? 
            <router-link to="/register" class="register-login-link">Register</router-link>
        </p>

        <p v-if="error" class="register-error-message">{{ error }}</p>
    </div>
</div>

</template>