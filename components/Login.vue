<!-- components/Login.vue -->

<template>
  <div class="login-container">
    <p class="kicker">// acceso</p>
    <h2>Dashboard</h2>
    <p class="login-desc">Inicia sesión para gestionar tu portfolio.</p>
    <form @submit.prevent="handleLogin">
      <MaterialInput
        v-model="formFields.email"
        :type="'text'"
        :label="'email'"
        :error="!!errors.email"
        :helper-text="errors.email || ''"
        :variant="'standard'"
      />
      <MaterialInput
        v-model="formFields.password"
        :type="'password'"
        :label="'password'"
        :error="!!errors.password"
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
  max-width: 420px;
  margin: 80px auto;
  padding: 40px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-container h2 {
    text-align: left;
    background: none;
    -webkit-background-clip: initial;
    background-clip: initial;
    color: var(--text);
}

.login-desc {
    color: var(--muted);
    font-size: 14px;
}
</style>
