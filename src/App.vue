<template>
  <v-app>
    <Sidebar />
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>
import { Icon } from '@iconify/vue';
import {defineComponent} from "vue";
import Sidebar from "@/components/Sidebar.vue";

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
