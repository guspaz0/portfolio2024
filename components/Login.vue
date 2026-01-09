<!-- components/Login.vue -->

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useWebsiteStore } from '~/stores/perfiles'
definePageMeta({
  middlewares: ['login.middleware']
})

const website = useWebsiteStore()
const { authenticated } = storeToRefs(website)

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    // Simulate a login request
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    });

    if (response.success) {
      authenticated.value = response.success
      // Set a token in a cookie or localStorage
      useCookie('auth_token', { value: response.token, maxAge: 3600 });
      router.push('/dashboard')
    } else {
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login.');
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-container h2 {
  text-align: center;
}

.login-container form {
  display: flex;
  flex-direction: column;
}

.login-container div {
  margin-bottom: 15px;
}

.login-container label {
  margin-bottom: 5px;
}

.login-container input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-container button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-container button:hover {
  background-color: #0056b3;
}
</style>