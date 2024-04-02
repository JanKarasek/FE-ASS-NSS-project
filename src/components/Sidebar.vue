<template>
	<v-card>
		<v-navigation-drawer :rail="isSmallScreen" permanent>
			<v-list-item-media>
				<img
					v-if="!isSmallScreen"
					src="@/assets/logo_en.png"
					alt="Logo"
					class="logo-default"
					height="64px"
				/>
				<img v-else src="@/assets/logo_mini.png" alt="Logo" class="logo-small" />
			</v-list-item-media>
			<v-list>
				<v-list-item
					prepend-icon="mdi-view-dashboard-outline"
					title="Dashboard"
					:to="{ name: 'dashboard' }"
				></v-list-item>
				<v-list-item
					prepend-icon="mdi-history"
					title="History"
					:to="{ name: 'history' }"
				></v-list-item>
				<v-list-item
					prepend-icon="mdi-chart-line"
					title="Measurements"
					:to="{ name: 'measurements' }"
				>
				</v-list-item>
				<v-list-item
					prepend-icon="mdi-cog-outline"
					title="Settings"
					:to="{ name: 'settings' }"
				></v-list-item>
			</v-list>
			<template v-slot:append>
				<div
					class="tw-w-auto tw-border-t-2 tw-border-light-grey"
				>
					<v-list-item
						prepend-icon="mdi-account-circle-outline"
						title="Miroslav Jaroš"
					></v-list-item>
				</div>
			</template>
		</v-navigation-drawer>
	</v-card>
</template>

<script setup>
import { ref } from 'vue';

const isSmallScreen = ref(window.innerWidth < 960);

window.addEventListener('resize', () => {
	isSmallScreen.value = window.innerWidth < 960;
});
</script>
<style scoped>
.logo-small {
	max-width: 100%;
	height: auto;
}

.logo-default {
	max-width: 60%;
	height: auto;
	display: block;
	margin-left: auto;
	margin-right: auto;
}
</style>
