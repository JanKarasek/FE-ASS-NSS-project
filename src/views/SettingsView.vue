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
                <v-row v-for="(user, index) in users" :key="index" class="ma-0">
                    <v-col class="pa-0">
                        <v-card class="mx-auto tw-bg-light-grey mt-4" variant="flat">
                            <v-row>
                                <v-col cols="12" sm="4">
                                    <v-card-title class="d-flex justify-start align-center text-center text-body-1">
                                        <v-icon class="pr-3"> mdi-account-circle-outline</v-icon>
                                        {{ user.firstName }} {{ user.lastName }}
                                    </v-card-title>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="tw-text-xl">Přidat nového uživatele</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field v-model="firstName" label="Zadejte jméno" density="compact" variant="outlined"
                            clearable :error-messages="firstNameError ? ['Neplatné jméno'] : []"
                            @blur="validate(firstName)" @click:clear="clearError(firstNameError)"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="lastName" label="Zadejte příjmení" density="compact" variant="outlined"
                            clearable :error-messages="lastNameError ? ['Neplatné příjmení'] : []"
                            @blur="validate(lastName)" @click:clear="clearError(lastNameError)"></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field v-model="userName" label="Zadejte uživatelské jméno" density="compact"
                            variant="outlined" clearable
                            :error-messages="userNameError ? ['Neplatné uživatelské jméno'] : []"
                            @blur="validate(userName)" @click:clear="clearError(userNameError)"></v-text-field>
                    </v-col>
                    <v-col>
                        <PrimaryButton @click="addUser" text="Přidat uživatele" />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import PrimaryButton from '@/components/button/PrimaryButton.vue';
import { useUserStore } from '@/stores/UserStore';
import { ref, onMounted, computed } from 'vue';

const store = useUserStore();

onMounted(() => {
    store.fetchUsers();
});

const users = computed(() => store.users);

const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const firstNameError = ref(false);
const lastNameError = ref(false);
const userNameError = ref(false);

const validate = (inp) => {
    console.log(inp.value);
    if (inp.value !== null) {
        inp.value = inp.value !== '';
    }
};

const clearError = (inp) => {
    inp.value = false;
};

function addUser() {
    if (firstName.value === '') { firstNameError.value = true; return; } else firstNameError.value = false;
    if (lastName.value === '') { lastNameError.value = true; return; } else lastNameError.value = false;
    if (userName.value === '') { userNameError.value = true; return; } else userNameError.value = false;
    try {
        const data = {
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            password: "admin",
            isAdmin: false,
        };
        store.addUser(data);
        users.value.push(data);
    } catch (error) {
        store.error = error.message;
    }
}
</script>

<style scoped></style>
