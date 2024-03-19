<template>
  <v-alert type="error"
    >{{ text }}

    <button @click="onHideClick"><v-icon>mdi-eye-off</v-icon></button>
  </v-alert>
</template>

<script>
export default {
  name: "Error",

  props: {
    text: {
      type: String,
      required: true,
    },
  },

  methods: {
    onHideClick() {
      this.$emit("hide");
    },
  },
};
</script>
