<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ingreso de notas</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <br />
            <ion-select
              fill="solid"
              label="seleccione un estudiante"
              shape="round"
              v-model="notas.carnet"
            >
              <ion-select-option
                v-for="(Student, i) in estudiantes"
                :key="i"
                :value="Student.carnet"
              >
                {{ Student.nombreEstudiante }}
              </ion-select-option>
            </ion-select>

            <br />
            <ion-select
              fill="solid"
              label="seleccione La materia del estudiante"
              shape="round"
              v-model="notas.idMaterias"
            >
              <ion-select-option
                v-for="(materia, i) in materias"
                :key="i"
                :value="materia.idMaterias"
              >
                {{ materia.nombreMateria }}
              </ion-select-option>
            </ion-select>
            <br />
            <ion-select
              fill="solid"
              label="seleccione la evaluacion del estudiante"
              shape="round"
              v-model="notas.idEvaluaciones"
            >
              <ion-select-option
                v-for="(evaluacion, i) in evaluaciones"
                :key="i"
                :value="evaluacion.idEvaluaciones"
              >
                {{ evaluacion.tipoEvaluacion }}
              </ion-select-option>
            </ion-select>
            <br />
            <ion-button
              shape="round"
              color="warning"
              expand="block"
              @click="ingresarNota"
            >
              <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
              Guardar
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-toast
        :duration="2500"
        :message="toastMessage"
        :is-open="toastState"
        @didDismiss="toastState = false"
        :icon="informationCircleOutline"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>
<script>
import axios from "axios";
import { checkmarkOutline, informationCircleOutline } from "ionicons/icons";
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
} from "@ionic/vue";
export default {
  name: "IngresoNotas",
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
  },
  data() {
    return {
      checkmarkOutline,
      informationCircleOutline,
      notas: {},
      estudiantes: [],
      materias: [],
      evaluaciones: [],
      toastState: false,
      toastMessage: null,
    };
  },
  methods: {
    ingresarNota() {
      axios
        .post("http://127.0.0.1:8000/api/ingresoNotas/store", this.notas)
        .then((response) => {
          let res = response.data;
          this.notas = {};

          if (response.code == 200) {
            this.toastState = true;
            this.toastMessage = res.data;
          }
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    getEstudiante() {
      axios
        .get("http://127.0.0.1:8000/api/estudiante/select")
        .then((response) => {
          console.log(response.data.data);
          if (response.data.code == 200) {
            this.estudiantes = response.data.data;
          }
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    getMaterias() {
      axios
        .get("http://127.0.0.1:8000/api/materia/select")
        .then((response) => {
          console.log(response.data.data);
          if (response.data.code == 200) {
            this.materias = response.data.data;
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
