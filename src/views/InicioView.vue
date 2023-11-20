<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Inicio</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Bienvenido Al sistema!</ion-card-title>
          <ion-card-subtitles>USUARIO: {{ this.user }}</ion-card-subtitles>
        </ion-card-header>
        <ion-card-content>
          <img
            src="https://www.compartirpalabramaestra.org/sites/default/files/styles/articulos/public/field/image/en-mi-salon-de-clase-no-hay-pupitres-y-los-estudiantes-son-lo-primero.jpg?itok=W1PJHXfe"
            alt="logo"
          />
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/vue";
export default {
  name: "InicioView",
  data() {
    return {
      user: "",
    };
  },
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonInput,
    Toolbar,
    IonSelect,
    IonSelectOption,
    IonToast,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  },
  methods: {
    async storage() {
      let datos = await this.$storage.get("user");
      this.user = datos;

      console.log(this.user);
    },
  },
  mounted() {
    this.storage();
  },
  ionViewWillEnter() {
    this.storage();
  },
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
