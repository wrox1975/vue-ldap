<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="login">
      <v-text-field
        v-model="username"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" type="submit">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios'; // Make sure to import axios
import router from '@/router'; // Import the router

export default defineComponent({
  name: 'Login',
  setup() {
    const valid = ref(false);
    const username = ref('');
    const password = ref('');

    const login = async () => {
      console.log('Login function called');
      try {
        const response = await axios.post('http://backend:3000/login', { username: username.value, password: password.value });
        console.log('Response received:', response.data);
        router.push({ name: 'Home' });
      } catch (error) {
        console.error('Login error:', error);
        if (axios.isAxiosError(error)) {
          console.error('Error details:', error.toJSON());
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    return {
      valid,
      username,
      password,
      login
    };
  }
});
</script>
