<template>
	<v-row>
		<v-col cols="4">
			<v-checkbox
				v-model="multispectral"
				label="Multispektrální kamera"
				color="#77BE13"
				@change="updateSettings"
			></v-checkbox>
			<v-text-field
				v-model="measurementLength"
				type="number"
				min="0"
				class="tw-pl-3"
				label="Délka měření akustické emise"
				placeholder="Zadejte délku v minutách"
				variant="underlined"
				@change="updateSettings"
			></v-text-field>
		</v-col>
		<v-col cols="4" offset="2">
			<v-checkbox
				v-model="rgb"
				label="RGB kamera"
				color="#77BE13"
				@change="updateSettings"
			></v-checkbox>
			<v-select
				v-model="numberOfSensors"
				variant="underlined"
				label="Počet senzorů"
				:items="sensorOptions"
				placeholder="Vyberte počet"
				@change="updateSettings"
			></v-select>
		</v-col>
	</v-row>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const emits = defineEmits([
	'update:multispectral',
	'update:rgb',
	'update:numberOfSensors',
	'update:measurementLength',
]);
const props = defineProps({
	multispectral: Boolean,
	rgb: Boolean,
	measurementLength: Number,
	numberOfSensors: Number,
});

const multispectral = ref(props.multispectral);
const rgb = ref(props.rgb);
const numberOfSensors = ref(props.numberOfSensors);
const measurementLength = ref(props.measurementLength);
const sensorOptions = ref([1, 2, 3, 4, 5, 6]); // Možnosti pro v-select

function updateSettings() {
	emits('update:multispectral', multispectral.value);
	emits('update:rgb', rgb.value);
	emits('update:numberOfSensors', numberOfSensors.value);
	emits('update:measurementLength', measurementLength.value);
}
</script>
