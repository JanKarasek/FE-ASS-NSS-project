<template>
  <h1 class="d-flex align-center mb-4">
    History
  </h1>
</template>

<script>
import { mapStores } from "pinia/dist/pinia";
import Error from "../components/Error.vue";
import Sidebar from "@/App.vue";

export default {
  name: "History",

  components: {
    Sidebar,
    Error,
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapStores(
    ),
  },

  methods: {},
};
</script>

<style scoped></style>
