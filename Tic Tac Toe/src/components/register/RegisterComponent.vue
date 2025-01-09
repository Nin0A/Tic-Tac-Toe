<script>
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
            } catch(e){
                this.error = e.response.data.message;
            }
        },
    }
}
</script>
<template>
    <div>
        <h1>Register</h1>
        <p>Register a new account</p>
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        <button @click="handleRegister">Register</button>
        <p v-if="error" style="color: red">{{ error }}</p>
    </div>
</template>
