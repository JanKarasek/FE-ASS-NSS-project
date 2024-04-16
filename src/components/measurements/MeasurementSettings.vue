<template>
    <v-row>
        <v-col cols="4">
            <v-checkbox v-model="multispectralCameraChecked" label="Multispektrální kamera" color="#77BE13"></v-checkbox>
            <v-text-field type="number" min="0" class="tw-pl-3" label="Délka měření akustické emise" placeholder="Zadejte délku v minutách"
                variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="4" offset="2">
            <v-checkbox v-model="rgbCameraChecked" label="RGB kamera" color="#77BE13"></v-checkbox>
            <v-select variant="underlined" label="Počet senzorů" :items=rgbCameraSensors
                placeholder="Vyberte počet"></v-select>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';

const multispectralCameraChecked = ref(false);
const rgbCameraChecked = ref(false);
const rgbCameraSensors = ref([1, 2, 3, 4, 5, 6]);
</script>