<template>
	<v-btn @click="onClick" :class="buttonClass" :size="size">
		<template v-if="icon">
			<v-icon>{{ icon }}</v-icon>
		</template>
		{{ text }}
	</v-btn>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
	text: String,
	icon: String,
	size: String,
});

const emit = defineEmits(['click']);

const buttonClass =
	'tw-bg-light-grey tw-rounded-2xl tw-text-black tw-normal-case';

const onClick = () => {
	emit('click');
};
</script>

<style scoped></style>
