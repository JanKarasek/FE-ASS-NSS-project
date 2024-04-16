<template>
    <v-card variant="flat" class="mx-auto tw-bg-light-grey" max-width="auto">
        <v-card-item>
            <div>
                <div class="text-overline mb-1">{{ title }}</div>
                <div class="text-h6 mb-1">{{ formatDate(datetime) }}</div>
            </div>
        </v-card-item>
    </v-card>
</template>

<script>
import { formatDateMinutes } from '@/utils';

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        datetime: {
            type: Date,
            required: true,
        }
    },
    methods: {
        formatDate(datetime) {
            return formatDateMinutes(datetime);
        }
    }
};
</script>