<!-- MainLayout.vue -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div style="margin-left: auto"></div>
        <!-- Logout Button -->
        <q-btn flat dense round icon="logout" aria-label="Logout" label="Logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" :item="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useStore } from "vuex"; // Import useStore from Vuex
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Dashboard",
    caption: "dashboard",
    icon: "dashboard",
    route: { name: "Dashboard" }
  },
  {
    title: "User",
    caption: "user",
    icon: "dashboard",
    route: { name: "User" }
  },
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const store = useStore();
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout() {
        store.commit("setAuthenticated", false);
        router.push("/");
      },
    };
  },
});
</script>
