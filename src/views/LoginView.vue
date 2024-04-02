<template>
    <v-app>
        <v-main>
            <v-container class="tw-h-full tw-w-full">
                <v-row class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-w-full">
                    <img src="@/assets/logo_en.png" alt="Logo" class="tw-h-32 tw-w-auto" />
                    <div class="tw-text-2xl tw-font-bold">Vítejte zpět</div>
                    <div class="tw-text-xl tw-text-gray-500 tw-mb-8">Systém pro výzkum akustických emisí</div>

                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <v-text-field variant="outlined" v-model="email" :readonly="loading"
                            :rules="[rules.required, rules.minName]" class="tw-mb-2 tw-w-96" label="Přihlašovací jméno"
                            clearable></v-text-field>

                        <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible"
                            variant="outlined" v-model="password" :readonly="loading"
                            :rules="[rules.required, rules.minPassword]" label="Password" placeholder="Zadejte heslo"
                            clearable></v-text-field>

                        <PrimaryButton block :disabled="!form" :loading="loading" type="submit" text="Pokračovat" />

                    </v-form>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script setup>
import PrimaryButton from '@/components/button/PrimaryButton.vue'
</script>

<script>
export default {
    data: () => ({
        form: false,
        email: null,
        password: null,
        loading: false,
        visible: false,
        rules: {
            required: v => !!v || 'Políčko je povinné',
            minPassword: v => v.length >= 4 || 'Heslo musí mít alespoň 4 znaky',
            minName: v => v.length >= 3 || 'Jméno musí mít alespoň 3 znaky'
        }
    }),

    methods: {
        onSubmit() {
            if (!this.form) return

            this.loading = true

            setTimeout(() => (this.loading = false, this.$router.push({ path: '/dashboard' })), 1000)
        },
    },
}
</script>