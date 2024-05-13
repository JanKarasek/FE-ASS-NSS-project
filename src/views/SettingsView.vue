<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row>
                    <v-col>
                        <div class="tw-text-2xl">Nastavení</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="tw-text-xl">Seznam uživatelů</div>
                    </v-col>
                </v-row>
                <v-row  v-for="(user, index) in users" :key="index" class="ma-0">
                    <v-col class="pa-0">
                        <v-card
                            class="mx-auto tw-bg-light-grey mt-4"
                            variant="flat">
                                <v-row>
                                    <v-col cols="12" sm="4">
                                        <v-card-title
                                            class="d-flex justify-start align-center text-center text-body-1">
                                            <v-icon class="pr-3"> mdi-account-circle-outline</v-icon>
                                            {{ user.firstName }} {{ user.lastName }}
                                        </v-card-title>
                                    </v-col>
                                </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { useUserStore } from '@/stores/UserStore';
import { ref, onMounted, computed } from 'vue';

const store = useUserStore();

onMounted(() => {
	store.fetchUsers();
});

const users = computed(() => store.users);

const email = ref('');
const emailError = ref(false);

// email validation
const validateEmail = () => {
    console.log(email.value);
    if (email.value !== null) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]*$/;
        emailError.value = email.value !== '' && !regex.test(email.value);
    }
};

const clearError = () => {
    emailError.value = false;
};
</script>

<style scoped></style>
