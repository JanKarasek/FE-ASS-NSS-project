<template>
    <VueDatePicker v-model="date" ref="dp" range enable-seconds @clearValue="clearInput" :format="format">
        <template #action-buttons>
            <PrimaryButton @click="selectDate" text="Vybrat datum" />
        </template>
        <template #clear-icon>
            <v-icon @click="clearInput" class="tw-pr-4">mdi-close</v-icon>
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
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
});

const date = ref([props.startDate, props.endDate]);
const dp = ref();

const selectDate = () => {
    dp.value.selectDate();
}

const clearInput = () => {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    emit('update:startDate', weekAgo);
    emit('update:endDate', now);
}

watch(() => [props.startDate, props.endDate], ([startDate, endDate]) => {
    date.value = [startDate, endDate];
});

const emit = defineEmits(['update:startDate', 'update:endDate']);

watch(date, ([startDate, endDate]) => {
    emit('update:startDate', startDate);
    emit('update:endDate', endDate);
});

</script>
