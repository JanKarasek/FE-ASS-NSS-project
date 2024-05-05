<template>
    <v-row>
        <v-col cols="4">
            <v-checkbox v-model="localMultispectralCameraChecked" @change="updateMultispectralCameraChecked($event.target.checked)" label="Multispektrální kamera" color="#77BE13"></v-checkbox>
            <v-text-field v-model="localMeasurementDuration" type="number" min="0" class="tw-pl-3" label="Délka měření akustické emise" placeholder="Zadejte délku v minutách" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="4" offset="2">
            <v-checkbox v-model="localRgbCameraChecked" @change="updateRgbCameraChecked($event.target.checked)" label="RGB kamera" color="#77BE13"></v-checkbox>
            <v-select v-model="localSelectedSensorCount" variant="underlined" label="Počet senzorů" :items="rgbCameraSensors" placeholder="Vyberte počet"></v-select>
        </v-col>
    </v-row>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    multispectralCameraChecked: Boolean,
    measurementDuration: Number,
    rgbCameraChecked: Boolean,
    selectedSensorCount: Number,
    rgbCameraSensors: Array
});

const emits = defineEmits(['update:multispectralCameraChecked', 'update:rgbCameraChecked', 'update:measurementDuration', 'update:selectedSensorCount']);

const localMeasurementDuration = ref(props.measurementDuration);
const localSelectedSensorCount = ref(props.selectedSensorCount);
const localMultispectralCameraChecked = ref(props.multispectralCameraChecked);
const localRgbCameraChecked = ref(props.rgbCameraChecked);

watch(localMeasurementDuration, (newValue) => {
    emits('update:measurementDuration', newValue);
});

watch(localSelectedSensorCount, (newValue) => {
    emits('update:selectedSensorCount', newValue);
});

function updateMultispectralCameraChecked(value) {
    localMultispectralCameraChecked.value = value;
    emits('update:multispectralCameraChecked', value);
}

function updateRgbCameraChecked(value) {
    localRgbCameraChecked.value = value;
    emits('update:rgbCameraChecked', value);
}
</script>
