<script setup>

</script>

<template>
  <v-navigation-drawer app permanent class="tw-h-screen">
    <v-list dense class="tw-py-4">
      <v-list-item-group>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="tw-text-base">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      items: [
        { title: 'Domů', icon: 'mdi-home', to: '/' },
        { title: 'O nás', icon: 'mdi-information', to: '/about' },
        // Přidejte další položky menu zde
      ],
    };
  },
};
</script>

<style scoped>

</style>
