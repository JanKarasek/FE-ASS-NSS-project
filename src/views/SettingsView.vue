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
                <v-row  v-for="(user, index) in users" :key="index">
                    <v-col>
                        <v-card
                            class="mx-auto tw-bg-light-grey mt-4"
                            variant="flat">
                                <v-row>
                                    <v-col cols="12" sm="4">
                                        <v-card-title
                                            class="d-flex justify-start text-center text-body-1">
                                            <v-icon> mdi-account-circle-outline</v-icon>
                                            {{ user.name }}
                                        </v-card-title>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-card-title class="text-center text-body-1">
                                            {{ user.role }}
                                        </v-card-title>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-card-actions class="d-flex justify-end">
                                            <PrimaryButton v-if="user.role === 'user'" text="Povýšit na administrátora" bgColor="tw-bg-dark-grey" />
                                            <PrimaryButton v-if="user.role !== 'admin'" text="Odebrat přístup" bgColor="tw-bg-very-dark-grey" />
                                        </v-card-actions>
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
                        <v-text-field
                            label="Zadejte emailovou adresu"
                            variant="outlined"></v-text-field>
                    </v-col>
                    <v-col>
                        <PrimaryButton text="Odeslat přihlašovací email"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from "@/components/button/PrimaryButton.vue";

// Dummy data array
const users = ref([
	{ name: 'Miroslav Jaroš', role: 'admin'},
    { name: 'Jan novák', role: 'user'},
    { name: 'Pavel novák', role: 'emailSent'},
]);

</script>

<style scoped></style>
