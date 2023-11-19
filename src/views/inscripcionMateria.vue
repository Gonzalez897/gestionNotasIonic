<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Inscripción de Materias</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list lines="full">
        <ion-item>
          <ion-col>
            <ion-select
              fill="solid"
              label="seleccione un estudiante"
              shape="round"
              v-model="inscripcion.carnet"
            >
              <ion-select-option
                v-for="(j, i) in estudiante"
                :key="i"
                :value="j.carnet"
              >
                {{ j.nombreEstudiante }}&nbsp;{{ j.apellidoEstudiante }}
              </ion-select-option>
            </ion-select>
          </ion-col>
          <br />
        </ion-item>

        <ion-item>
          <ion-col>
            <ion-select
              fill="solid"
              label="seleccione una materia"
              shape="round"
              v-model="inscripcion.idMaterias"
            >
              <ion-select-option
                v-for="(x, i) in materia"
                :key="i"
                :value="x.idMaterias"
              >
                {{ x.nombreMateria }}
              </ion-select-option>
            </ion-select>
          </ion-col>
          <br />
        </ion-item>

        <ion-button
          shape="round"
          color="warning"
          expand="block"
          @click="agregarInscripcion"
          >Inscribir</ion-button
        >
      </ion-list>
      <ion-toast
        :duration="2500"
        :message="messagesToast"
        :is-open="stateToast"
        @didDimiss="stateToast = false"
        :icon="informationCircleOutline"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script>
import { informationCircleOutline } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonList,
  IonContent,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonTitle,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton,
  IonCol,
  IonToast,
} from "@ionic/vue";
import axios from "axios";
export default {
  name: "inscripcionMateria",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonList,
    IonContent,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonTitle,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonBackButton,
    IonCol,
    IonToast,
  },
  data() {
    return {
      informationCircleOutline,
      inscripcion: {
        carnet: "",
        idMaterias: "",
      },
      estudiante: [],
      materia: [],
      stateToast: false,
      messagesToast: "",
    };
  },
  methods: {
    agregarInscripcion() {
      axios
        .post("http://127.0.0.1:8000/api/inscripcion/store", this.inscripcion)
        .then((response) => {
          if (response.data.code == 200) {
            this.stateToast = true;
            this.messagesToast = response.data.data;

            this.inscripcion = {};
          }
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    getEstudiante() {
      axios
        .get("http://127.0.0.1:8000/api/estudiante/select")
        .then((response) => {
          console.log(response);

          if (response.data.code == 200) {
            this.estudiante = response.data.data;
          }
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    getMaterias() {
      axios
        .get("http://127.0.0.1:8000/api/materias/select")
        .then((response) => {
          console.log(response);

          if (response.data.code == 200) {
            this.materia = response.data.data;
          }
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
  },
  mounted() {
    this.getEstudiante();
    this.getMaterias();
  },
};
</script>

<style scoped></style>
