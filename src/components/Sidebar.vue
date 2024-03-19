<template>
  <v-card>
      <v-navigation-drawer permanent theme="light">
        <v-list-item>
          <div class="text-center py-4">
            <img src="@/assets/logo_en.jpg" alt="Logo" class="logo">
          </div>
        </v-list-item>
        <v-list>
          <v-list-item prepend-icon="mdi-view-dashboard-outline" title="Dashboard" :to="{ name: 'dashboard' }"></v-list-item>
          <v-list-item prepend-icon="mdi-history" title="History" :to="{ name: 'history' }"></v-list-item>
          <v-list-item prepend-icon="mdi-chart-line" title="Measurements" :to="{ name: 'measurements' }"> </v-list-item>
          <v-list-item prepend-icon="mdi-cog-outline" title= "Settings" :to="{ name: 'settings' }"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-4">
             <v-list-item
                prepend-icon="mdi-account-circle-outline"
                title= "Miroslav Jaroš"
            ></v-list-item>
          </div>
        </template>
      </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {};
  },
};
</script>

<style scoped>
.logo {
  max-width: 100%;
  height: auto;
}
</style>
