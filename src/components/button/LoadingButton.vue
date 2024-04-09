<template>
    <v-btn
        @click="onClick"
        class="tw-bg-mendelu-green tw-rounded-2xl tw-text-white tw-normal-case"
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
            loading: false,
        };
    },

    methods: {
        onClick() {
            this.loading = true;
            this.$emit("click");
        },
        setLoadingState(newState) {
            this.loading = newState;
        }
    },
};
</script>

<style scoped>
</style>
