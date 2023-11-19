<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Ingreso de notas</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <br />
            <ion-col>
              <ion-select
                fill="solid"
                label="seleccione un estudiante"
                shape="round"
                v-model="carnet"
              >
                <ion-select-option
                  v-for="(Student, i) in data"
                  :key="i"
                  :value="Student.carnet"
                >
                  {{ Student.nombreE }}&nbsp;{{ Student.apellidoE }}
                </ion-select-option>
              </ion-select>
            </ion-col>
            <br />
            <ion-col>
              <ion-select
                fill="solid"
                label="seleccione La materia del estudiante"
                shape="round"
                v-model="idMaterias"
              >
                <ion-select-option
                  v-for="(q, i) in datos"
                  :key="i"
                  :value="q.idMaterias"
                >
                  {{ q.nombreMateria }}
                </ion-select-option>
              </ion-select>
            </ion-col>
            <br />
            <ion-col>
              <ion-select
                fill="solid"
                label="seleccione la evaluacion del estudiante"
                shape="round"
                v-model="data1"
              >
                <ion-select-option
                  v-for="(n, i) in evaluaciones"
                  :key="i"
                  :value="i"
                >
                  {{ n.nombreEvaluacion }}
                </ion-select-option>
              </ion-select>
            </ion-col>
            <br />
            <ion-grid>
              <ion-row>
                <ion-col size="6">
                  <ion-input
                    label="Nota a Ingresar"
                    type="number"
                    fill="solid"
                    label-placement="floating"
                    :clear-input="true"
                    v-model="valorNota"
                  ></ion-input>
                  <br />
                </ion-col>
                <ion-col size="6">
                  <ion-input
                    label="Porcentaje"
                    type="number"
                    fill="solid"
                    label-placement="floating"
                    disabled="true"
                    v-show="mostrarPorcentaje"
                    v-model="porcent"
                  ></ion-input>
                  <br />
                </ion-col>
              </ion-row>
            </ion-grid>
            <ion-button
              shape="round"
              color="warning"
              expand="block"
              @click="ingresarNota"
            >
              <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
              <b>Guardar</b>
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
  IonButtons,
  IonBackButton,
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
    IonButtons,
    IonBackButton,
  },
  data() {
    return {
      checkmarkOutline,
      informationCircleOutline,
      valorNota: null,
      datosNota: {
        idInscripcion: null,
        idEvaluaciones: null,
        nota: null,
      },
      data: [],
      data1: {},
      datos: [],
      idInscripcion: "",
      carnet: "",
      idMaterias: "",
      mostrarPorcentaje: false,
      porcent: null,
      evaluaciones: [],
      toastState: false,
      toastMessage: null,
    };
  },
  methods: {
    ingresarNota() {
      let operacion = this.valorNota * this.porcent;
      this.datosNota.nota = operacion.toFixed(1);
      axios
        .post("http://127.0.0.1:8000/api/ingresoNotas/store", this.datosNota)
        .then((response) => {
          if (response.data.code == 200) {
            this.toastState = true;
            this.toastMessage = "El ingreso se realizo con exito!";
          }
          console.log(response);
        })
        .catch((error) => console.log("ha ocurrido un error" + error));

      this.valorNota = "";
      this.carnet = "";
      this.idMaterias = "";

      this.mostrarPorcentaje = false;
      this.porcent = "";
      this.datosNota = {};
    },
    getInscripcionEstudiante() {
      axios
        .get("http://127.0.0.1:8000/api/inscripcionEstudiante/select")
        .then((response) => {
          console.log(response.data.data);
          if (response.data.code == 200) {
            this.data = response.data.data;
          }
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    getInscripcionMateria(carnet) {
      axios
        .get(`http://127.0.0.1:8000/api/inscripcionMateria/select/${carnet}`)
        .then((response) => {
          console.log(response.data.data);
          if (response.data.code == 200) {
            this.datos = response.data.data;
          }
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    getEvaluacion() {
      axios
        .get(
          `http://127.0.0.1:8000/api/inscripcion/idInscripcion/${this.carnet}/${this.idMaterias}`
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.evaluaciones = response.data.data;
            console.log(this.evaluaciones);
          }
        })
        .catch((error) => {
          this.toastState = true;
          this.toastMessage =
            "Lo sentimos este Alumno no tiene evaluaciones por que no esta inscrito en esta materia";
          this.idMaterias = "";
        });
    },
  },
  mounted() {
    this.getInscripcionEstudiante();
  },
  watch: {
    carnet(nuevo) {
      if (nuevo != "") {
        this.getInscripcionMateria(nuevo);
      }
    },
    idMaterias(nuevo) {
      if (nuevo != "") {
        this.getEvaluacion();
      }
    },
    data1(nuevo) {
      console.log(this.evaluaciones[nuevo]);
      this.mostrarPorcentaje = true;
      this.porcent = this.evaluaciones[nuevo].porcentaje;

      this.datosNota.idInscripcion = this.evaluaciones[nuevo].idInscripcion;
      console.log(this.datosNota.idInscripcion);
      this.datosNota.idEvaluaciones = this.evaluaciones[nuevo].idEvaluaciones;
    },
  },
};
</script>
