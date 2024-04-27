<template>
  <q-page class="q-pa-0 flex justify-center full-height">
    <q-form @submit="saveUser" class="q-gutter-md full-width">
      <!-- Form Title -->
      <div class="text-center">
        <h2>{{ isEdit ? 'Edit User' : 'Add User' }}</h2>
      </div>

      <!-- Form Inputs -->
      <q-input v-model="user.name" label="Name" outlined dense :rules="nameRules" />
      <q-input v-model="user.email" label="Email" type="email" outlined dense :rules="emailRules" />
      <q-input v-model="user.password" label="Password" type="password" outlined dense :rules="passwordRules" />
      <div class="gender-radio flex">
        <q-radio v-model="user.gender" val="male" label="Male" dense :rules="genderRules" />
        <q-radio v-model="user.gender" val="female" label="Female" dense :rules="genderRules" />
        <q-radio v-model="user.gender" val="other" label="Other" dense :rules="genderRules" />
      </div>
      <q-select v-model="user.role" label="Role" outlined dense :options="roleOptions" :rules="roleRules" />
      <q-checkbox v-model="user.isActive" label="Active" dense />
      <q-btn type="submit" color="primary" label="Save" class="q-mt-md" />
    </q-form>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import { USER_URL } from "../config/urls";

export default {
  name: "AddEditForm",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEdit = !!route.params.id;
    const user = ref({
      name: "",
      email: "",
      password: "",
      gender: "",
      role: "",
      isActive: false,
    });

    // Function to handle displaying error notifications
    const showErrorNotification = (message) => {
      // Display a red-colored notification with the error message
      this.$q.notify({
        color: 'negative',
        message: message,
      });
    };

    // Fetch user data from API when editing
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${USER_URL}/${route.params.id}`);
        if (response.status === 200) {
          const userData = response.data;
          const role = roleOptions.find(option => option.value === userData.role);
          user.value = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            gender: userData.gender,
            role: role,
            isActive: userData.isActive,
          };
        } else {
          showErrorNotification("Failed to fetch user data");
        }
      } catch (error) {
        showErrorNotification("Error fetching user data");
      }
    };

    onMounted(() => {
      if (isEdit) {
        fetchUser();
      }
    });

    const roleOptions = [
      { label: "Admin", value: 1 },
      { label: "User", value: 2 },
    ];

    const nameRules = [
      (v) => !!v || "Name is required",
    ];
    const emailRules = [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
      async (v) => {
        if (v) {
          const userExists = await checkUserExists(v);
          if (userExists) {
            return "User with this email already exists";
          }
        }
        return true;
      }
    ];
    const passwordRules = [
      (v) => !!v || "Password is required",
      (v) => v && v.length >= 8 || "Password must be at least 8 characters long",
    ];
    const genderRules = [
      (v) => !!v || "Gender is required",
      (v) => !!v.length || "Please select at least one gender",
    ];
    const roleRules = [
      (v) => !!v || "Role is required",
    ];

    const saveUser = async () => {
      const isValid = validateForm();
      if (isValid) {
        const formData = { ...user.value };
        formData.role = user.value.role.value;

        try {
          const response = await axios[isEdit ? 'put' : 'post'](`${USER_URL}${isEdit ? `/${user.value.id}` : ''}`, formData);
          if (response.status >= 200 && response.status < 300) {
            router.push('/user');
          } else {
            showErrorNotification(`Failed to ${isEdit ? 'edit' : 'add'} user. Status: ${response.status}`);
          }
        } catch (error) {
          showErrorNotification(`Error ${isEdit ? 'editing' : 'adding'} user: ${error.message}`);
        }
      } else {
        showErrorNotification('Error saving user: Invalid form data');
      }
    };

    const validateForm = () => {
      return (
        user.value.name &&
        user.value.email &&
        user.value.password &&
        user.value.gender &&
        user.value.role
      );
    };

    const checkUserExists = async (email) => {
      try {
        const response = await axios.get(`${USER_URL}?email=${email}`);
        const filteredUsers = response.data.filter(u => u.id !== user.value.id);
        return filteredUsers.length > 0;
      } catch (error) {
        showErrorNotification('Error checking if user exists');
        return false;
      }
    };

    return {
      user,
      nameRules,
      emailRules,
      passwordRules,
      genderRules,
      roleRules,
      roleOptions,
      saveUser,
      isEdit,
    };
  },
};
</script>

<style scoped>
.q-form {
  max-width: 400px;
}

.gender-radio {
  gap: 20px;
}

.q-radio__inner {
  margin-right: 5px;
}

.q-radio__label {
  white-space: nowrap;
}

.q-field__messages {
  color: red;
}
</style>
