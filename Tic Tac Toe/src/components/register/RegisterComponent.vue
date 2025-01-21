<script>
import '../../assets/css/STYLE_RegisterComponent.css';
import { register } from '@/services/DataProvider.js';
export default{
    data(){
        return{
            username: '',
            password: '',
            confirmPassword: '',
            error: null
        }
    },

    methods: {
        async handleRegister() {
            if(this.password !== this.confirmPassword){
                this.error = 'Passwords do not match';
                return;
            }
            try{
                await register(this.username, this.password);
                this.$router.push('/login');
            } catch (e) {
                this.error = e.response.data.message;
            }
        },
    }
}
</script>
<template>
    <div class="container">
        <div class="register-container">
        <h1 class="register-title">Register</h1>
        <p class="register-subtitle">Register a new account</p>
        <input v-model="username" type="text" placeholder="Username" class="register-input" />
        <input v-model="password" type="password" placeholder="Password" class="register-input" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="register-input" />
        <button @click="handleRegister" class="register-button">Register</button>
        <p class="register-login-prompt">Already have an account? <router-link to="/login" class="register-login-link">Login</router-link></p>
        <p v-if="error" class="register-error-message">{{ error }}</p>
        </div>
    </div>

</template>
