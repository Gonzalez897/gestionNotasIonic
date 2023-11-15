<template>
    <ion-buttons slot="end">
        <ion-button @click="logout" :icon="logOutOutline">Cerrar Sesion</ion-button>
    </ion-buttons>
</template>

<script>
import {
    IonButtons, IonButton
} from "@ionic/vue";

import { logOutOutline } from "ionicons/icons";

export default {
    name: 'Toolbar',
    components: {
        IonButtons, IonButton
    },
    data() {
        return {
            logOutOutline
        }
    },
    methods: {
        async logout() {

            await this.$storage.clear();

            this.$router.push('/');

        }
    }
}
</script>