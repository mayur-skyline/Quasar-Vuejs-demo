<!-- EssentialLink.vue -->
<template>
  <q-item clickable v-if="item.route" :to="item.route">
    <q-item-section avatar>
      <q-icon :name="item.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ item.title }}</q-item-label>
      <q-item-label caption>{{ item.caption }}</q-item-label>
    </q-item-section>
  </q-item>
  <q-item clickable v-else :href="item.link" target="_blank">
    <q-item-section avatar>
      <q-icon :name="item.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ item.title }}</q-item-label>
      <q-item-label caption>{{ item.caption }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon name="open_in_new" />
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>
