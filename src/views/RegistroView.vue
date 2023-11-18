<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Registros
                </ion-title>
                <Toolbar></Toolbar>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-button href="tabs/tab4">Registro Docente</ion-button>
                    <ion-button href="tabs/tab5">Registro Estudiante</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
<script>
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonRow, IonGrid, IonCol, IonButton, IonInput, IonToast,
    IonMenuButton, IonButtons, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent
} from '@ionic/vue';
import Toolbar from './Toolbar.vue';
export default{
    name: 'RegistroView',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
        IonRow, IonGrid, IonCol, IonButton, IonInput, IonToast,
        IonMenuButton, IonButtons, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, Toolbar
    },
}
</script>