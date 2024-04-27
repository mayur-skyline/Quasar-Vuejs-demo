<template>
  <div class="login-page">
    <h2>Login</h2>
    <q-form ref="form" @submit="login">
      <q-input filled v-model="email" label="Email" :rules="emailRule" class="input-field" />
      <q-input filled v-model="password" label="Password" :type="passwordFieldType" :rules="passwordRule"
        class="input-field">
        <!-- Append slot for the eye icon -->
        <template v-slot:append>
          <q-icon :name="passwordFieldType === 'password' ? 'visibility' : 'visibility_off'
      " @click="togglePasswordVisibility" class="cursor-pointer" />
        </template>
      </q-input>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <q-btn color="primary" label="Login" type="submit" class="login-btn" />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex"; // Import useStore from Vuex

const email = ref("");
const password = ref("");
const router = useRouter();
const store = useStore();
const errorMessage = ref("");
const form = ref(null); // Create a reference to the form element
const passwordFieldType = ref("password"); // Initially password field is hidden

// Email validation rule
const emailRule = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];
const passwordRule = [(v) => !!v || "Password is required"];

const login = () => {
  // Access the store within the setup function
  // Perform form validation
  if (!validateForm()) return;

  // Validate user credentials
  if (email.value === "test@gmail.com" && password.value === "password") {
    // Store authentication state (you can use Vuex or localStorage)
    store.commit("setAuthenticated", true); // Use store to commit mutation
    // Redirect user to dashboard or home page
    router.push("dashboard"); // This line redirects to the dashboard path
  } else {
    // Show error message
    errorMessage.value = "Invalid credentials. Please try again.";
  }
};

function validateForm() {
  // Access the form's validate method using the form reference
  return form.value.validate();
}

// Function to toggle password visibility
const togglePasswordVisibility = () => {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.input-field {
  margin-bottom: 10px;
}

.login-btn {
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
