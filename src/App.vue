<template>
  <v-app>
    <Sidebar />
    <v-app-bar color="#FF00FF">
      <v-app-bar-title>
        <Icon icon="mdi-light:home" />Home
      </v-app-bar-title>
      <v-btn :to="{ name: 'home' }">Homepage</v-btn>
      <!--
            <v-menu anchor="bottom end" v-model="userMenuShown">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon="mdi-account-circle">
                  Activator slot
                </v-btn>
              </template>
              <v-list>

                <v-list-item v-if="!userStore.isAuthenticated" @click="login()">
                  <v-list-item-title>Log in</v-list-item-title>
                </v-list-item>
                <v-list-item v-else @click="logout()">
                  <v-list-item-title>Log out</v-list-item-title>
                </v-list-item>

        </v-list>
      </v-menu>

        -->
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Icon } from '@iconify/vue';
import {defineComponent} from "vue";
import Sidebar from "@/views/SideBar.vue";

export default defineComponent({
  components: {Sidebar, Icon}
})

/*
import { useUserStore } from "./stores/UserStore";
import { mapStores } from "pinia/dist/pinia";

export default {
  name: "App",
  data() {
    return {
    };
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    login() {
     // this.$router.push({ name: "login" });
     // this.userMenuShown = false;
    },
    logout() {
     // this.userStore.logout();
     // this.$router.push({ name: "home" });
     // this.userMenuShown = false;
    },
  },
};
 */
</script>

<style scoped>
nav {
  margin-bottom: 1em;
}

 html, body, .v-application {
   font-family: 'Be Vietnam Pro', sans-serif !important;
 }
</style>
