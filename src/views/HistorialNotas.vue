<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Historial de Notas</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
      <!-- <Toolbar></Toolbar> -->
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-content>
          <ion-list>
            <ion-item-sliding v-for="(notas, i) in notas2" :key="i">
              <ion-item>
                <ion-label>Carnet: {{ notas.carnet }}</ion-label>
                <ion-label>Nombre :{{ notas.nombreEstudiante }}</ion-label>
              </ion-item>

              <ion-item-options side="end">
                <ion-item-option
                  color="primary"
                  @click="getNotas1(notas.idNotas, 1)"
                >
                  <ion-icon slot="icon-only" :icon="eye"></ion-icon>
                </ion-item-option>
                <ion-item-option
                  color="danger"
                  @click="eliminarNotas(notas.idNotas)"
                >
                  <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-modal :is-open="modalNotas">
        <ion-header>
          <ion-toolbar>
            <ion-title>Visualizacion de Notas</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="modalNotas = false">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-table>
            <ion-row>
              <ion-col>Nota</ion-col>
              <ion-col>{{ notas.nota }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Carnet</ion-col>
              <ion-col>{{ notas.carnet }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Nombre del Estudiante</ion-col>
              <ion-col>{{ notas.nombreEstudiante }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>ID de Evaluaciones</ion-col>
              <ion-col>{{ notas.idEvaluaciones }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Nombre de la Evaluación</ion-col>
              <ion-col>{{ notas.nombreEvaluacion }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>ID de Profesores</ion-col>
              <ion-col>{{ notas.idProfesores }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Nombre del Profesor</ion-col>
              <ion-col>{{ notas.nombreProfesor }}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>Nombre de la Materia</ion-col>
              <ion-col>{{ notas.nombreMateria }}</ion-col>
            </ion-row>
          </ion-table>
        </ion-content>
      </ion-modal>

      <ion-toast
        :is-open="btEliminar"
        @didDismiss="btEliminar = false"
        :message="MsgEliminar"
        :duration="5000"
      ></ion-toast>
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  IonInput,
  IonToast,
  IonRow,
  IonCol,
  IonBackButton,
} from "@ionic/vue";
import Toolbar from "./Toolbar.vue";
import { create, eye, trash } from "ionicons/icons";
import axios from "axios";

// import Toolbar from './Toolbar.vue';
export default {
  name: "NotasView",
  estudiante: [],
  model: "",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonButtons,
    IonInput,
    IonToast,
    IonRow,
    IonCol,
    IonBackButton,
    Toolbar,
  },

  data() {
    return {
      eye,
      create,
      trash,
      modalNotas: false,
      MsgEliminar: "",
      btEliminar: false,
      notas: [],
      notas2: {},
      config: {},
    };
  },

  methods: {
    async getToken() {
      let token = await this.$storage.get("token");
      console.log("Este es token " + token);
      this.config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      this.getNotas();
    },

    getNotas() {
      axios
        .get("http://localhost:8000/api/notas/select", this.config)
        .then((response) => {
          this.notas2 = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => "Hubo un error " + error);
    },
    getNotas1(idNotas, action) {
      if (action == 1) {
        this.modalNotas = true;
      } else {
      }

      axios
        .get(`http://localhost:8000/api/notas/find/${idNotas}`, this.config)
        .then((response) => {
          this.notas = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => console.log("hubo un error " + error));
    },
    eliminarNotas(idNotas) {
      axios
        .delete(
          `http://localhost:8000/api/notas/eliminar/${idNotas}`,
          this.config
        )
        .then((response) => {
          console.log(response);

          this.getNotas();
        })
        .catch((error) => console.log("hubo un error " + error));
    },

    ionViewWillEnter() {
      // this.getToken()
      this.getNotas();
    },
  },
};
</script>
