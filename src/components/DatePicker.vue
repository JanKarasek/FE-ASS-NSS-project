<template>
    <v-date-picker
        v-model="selectedDate"
        locale="cs"
        :min="minDate"
        :max="maxDate"
        color="#65a61a"
    ></v-date-picker>
</template>

<script>
export default {
    props: {
        minDate: {
            type: String,
            default: null
        },
        maxDate: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            selectedDate: null
        };
    }
};
</script>

<style scoped>
</style>
