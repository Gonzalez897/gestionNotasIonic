<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Registros Notas</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <ion-button
                  shape="round"
                  color="warning"
                  expand="block"
                  router-link="/tabs/tab3"
                  ><b>Registro Notas</b></ion-button
                >
              </ion-col>
              <ion-col size="6">
                <ion-button
                  shape="round"
                  color="warning"
                  expand="block"
                  router-link="/tabs/tab6"
                  ><b>Registro Evaluaciones</b></ion-button
                >
              </ion-col>
              <ion-col size="6">
                <ion-button
                  shape="round"
                  color="warning"
                  expand="block"
                  router-link="/tabs/tab7"
                  ><b>Visualizacion de Notas</b></ion-button
                >
              </ion-col>
              <ion-col size="6">
                <ion-button
                  shape="round"
                  color="warning"
                  expand="block"
                  router-link="/tabs/tab9"
                  ><b>Historial de notas</b></ion-button
                >
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRow,
  IonGrid,
  IonCol,
  IonButton,
  IonInput,
  IonToast,
  IonMenuButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";
import Toolbar from "./Toolbar.vue";
export default {
  name: "RegistroView",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRow,
    IonGrid,
    IonCol,
    IonButton,
    IonInput,
    IonToast,
    IonMenuButton,
    IonButtons,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    Toolbar,
  },
};
</script>
