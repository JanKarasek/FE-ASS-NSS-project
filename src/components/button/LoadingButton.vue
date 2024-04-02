<template>
    <v-btn
        @click="onClick"
        class="tw-bg-mendelu-green tw-rounded-2xl tw-text-white"
        :size="size"
        :disabled="loading"
    >
        <template v-if="loading">
            <v-progress-circular indeterminate model-value="20" :size="20"></v-progress-circular>
            &nbsp;
            {{ loadingText }}
        </template>
        <div v-else>{{ text }}</div>
    </v-btn>
</template>

<script>
export default {
    name: "LoadingButton",

    props: {
        text: String,
        loadingText: String,
        size: String,
    },

    data() {
        return {
            loading: false, // Stav načítání
        };
    },

    methods: {
        onClick() {
            this.loading = true; // Nastaví stav načítání na true při kliknutí
            this.$emit("click");
        },
        setLoadingState(newState) {
            // Metoda pro nastavení stavu načítání
            this.loading = newState;
        }
    },
};
</script>

<style scoped>
</style>
