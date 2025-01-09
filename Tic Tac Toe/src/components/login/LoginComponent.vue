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
                await login(this.username, this.password);
                this.$router.push('/dashboard');
            } catch (e) {
                this.error = e.response.data.message;
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
        <p v-if="error" style="color: red">{{ error }}</p>
    </div>
</template>