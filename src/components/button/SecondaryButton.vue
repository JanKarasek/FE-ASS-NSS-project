<template>
	<v-btn
		@click="onClick"
		class="tw-bg-light-grey tw-rounded-2xl tw-text-black tw-normal-case"
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
	name: 'SecondaryButton',

	props: {
		text: String,
		icon: String,
		size: String,
	},

	methods: {
		onClick() {
			this.$emit('click');
		},
	},
};
</script>

<style scoped></style>
