<template>
    <VueDatePicker v-model="date" ref="dp" locale="cz" enable-seconds :format="format">
        <template #action-buttons>
            <PrimaryButton @click="selectDate" text="Vybrat datum" />
        </template>
    </VueDatePicker>
</template>

<script setup>
import { ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { defineProps, defineEmits } from 'vue';
import PrimaryButton from '../button/PrimaryButton.vue';

const props = defineProps({
    date: {
        type: Date,
        default: Date.now(),
    },
});

const date = ref(props.date);
const dp = ref();

const selectDate = () => {
    dp.value.selectDate();
}

// Watch for changes in props and update the date ref accordingly
watch(() => props.date, (newDate) => {
    date.value = newDate;
});

const emit = defineEmits('update:date');

// Emit changes back to parent component
watch(date, (date) => {
    emit('update:date', date);
});

</script>
