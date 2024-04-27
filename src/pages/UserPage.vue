<template>
  <q-page>
    <!-- Header Section -->
    <div class="flex flex-center mt-5 mb-5 q-pa-md">
      <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" />
    </div>

    <!-- Table Section -->
    <div class="q-pa-md">
      <div class="flex justify-end q-mb-md">
        <!-- Aligns children to the right -->
        <q-btn color="primary" label="Add" @click="goToForm(null)" />
      </div>

      <q-table :rows="filteredRows" :columns="columns" row-key="id" separator="horizontal" class="shadow-2">
        <template v-slot:body-cell="props">
          <q-td :props="props">
            <template v-if="props.col.field === 'actions'">
              <q-btn color="primary" icon="edit" @click="goToForm(props.row)" class="q-mr-sm"
                style="min-width: 36px;" />
              <q-btn color="negative" icon="delete" @click="confirmDeleteRow(props.row)" class="q-ml-sm"
                style="min-width: 36px;" />
            </template>
            <template v-else>
              {{ props.row[props.col.field] }}
            </template>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from "vue-router";
import { USER_URL } from "../config/urls";

const router = useRouter();
const $q = useQuasar();

const columns = [
  {
    name: "Name",
    required: true,
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
  },
  {
    name: "Email",
    align: "left",
    label: "Email",
    field: "email",
    sortable: true,
  },
  { name: "Gender", align: "left", label: "Gender", field: "gender", sortable: true },
  { name: "Role", align: "center", label: "Role", field: "role", sortable: true },
  { name: "Status", align: "center", label: "Status", field: "status", sortable: true },
  { name: "Actions", align: "center", label: "Actions", field: "actions" },
];

const rows = ref([]);

const fetchRows = async () => {
  try {
    const response = await axios.get(USER_URL);
    if (response.status >= 200 && response.status < 300) {
      rows.value = response.data.map(user => ({
        ...user,
        role: user.role === 1 ? 'Admin' : 'User',
        status: user.isActive ? 'Active' : 'Inactive',
        actions: 'actions'
      }));
    } else {
      console.error('No data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(fetchRows);

function goToForm(user) {
  if (user && user.id) {
    router.push({ name: "UserForm", params: { id: user.id } });
  } else {
    router.push({ name: "UserForm" }); // For adding a new user
  }
}

const filteredRows = computed(() => rows.value.filter(user => user.role === 'Admin' || user.role === 'User'));

async function confirmDeleteRow(row) {
  const confirmDialog = $q.dialog({
    title: 'Confirm',
    message: 'Would you like to delete this item?',
    cancel: true,
    persistent: true
  });

  // Handle the confirmation or cancellation
  confirmDialog.onOk(() => {
    // User confirmed deletion
    deleteRow(row);
  });
}
async function deleteRow(row) {
  try {
    const response = await axios.delete(`${USER_URL}/${row.id}`);
    if (response.status >= 200 && response.status < 300) {

      // Remove the deleted row from the `rows` array
      const index = rows.value.findIndex(item => item.id === row.id);
      if (index !== -1) {
        rows.value.splice(index, 1);
      }

      // Show a Snackbar or Toast notification
      $q.notify({
        color: 'positive',
        position: 'bottom',
        message: 'Record deleted successfully',
        icon: 'check'
      });
    } else {
      console.error("Failed to delete record:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting record:", error);
  }
}
</script>
