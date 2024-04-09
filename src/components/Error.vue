<template>
	<v-alert type="error">
		{{ text }}

		<button @click="onHideClick">
			<v-icon>mdi-eye-off</v-icon>
		</button>
	</v-alert>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	text: {
		type: String,
		required: true,
	},
});

const emit = defineEmits(['hide']);

const onHideClick = () => {
	emit('hide');
};
</script>
