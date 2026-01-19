<!-- components/Login.vue -->

<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <MaterialInput
        v-model="formFields.email"
        :type="'text'"
        :label="'email'"
        :errors="!!errors.email"
        :helper-text="errors.email || ''"
        :variant="'standard'"
      />
      <MaterialInput
        v-model="formFields.password"
        :type="'password'"
        :label="'password'"
        :errors="!!errors.password"
        :helper-text="errors.password || ''"
        :variant="'standard'"
      />
      <CustomSubmitButton :content="'Login'"/>
    </form>
  </div>
</template>

<script setup lang="ts">
import { LoginRequestDto } from '~/server/utils/loginRequestDto';

const website = useWebsiteStore()
const { user } = storeToRefs(website)

const formFields = reactive<LoginRequestDto>({
  email: '',
  password: ''
});

const { errors, validateForm } = useFormValidator(formFields, LoginRequestDto)

watch(formFields, () => validateForm())

const router = useRouter();

const handleLogin = async () => {
  const isFine = await validateForm()
  if (!isFine) throw new Error('Validation failed')
  try {
    // Simulate a login request
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: formFields
    });
    if (response.success) {
      router.push('/dashboard')
    } else {
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    alert('An error occurred during login.');
  }
};
onMounted(() => {
  if (user.value) {
    navigateTo('/dashboard')
  }
})
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
</style>