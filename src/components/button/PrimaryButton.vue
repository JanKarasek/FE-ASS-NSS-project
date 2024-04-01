<template>
    <v-btn
        @click="onClick"
        class="tw-bg-mendelu-green tw-rounded-2xl tw-text-white"
        :size="size"
    >
        <template v-if="icon">
            <v-icon>{{ icon }}</v-icon>
        </template>
        {{ text }}
    </v-btn>
</template>

<script>
export default {
    name: "PrimaryButton",

    props: {
        text: String,
        icon: String,
        size: String,
    },

    methods: {
        onClick() {
            this.$emit("click");
        },
    },
};
</script>

<style scoped>
</style>
