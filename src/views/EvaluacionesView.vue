<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Evaluaciones</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-select
              label="Estudiantes"
              fill="solid"
              color="primary"
              v-model="carnet"
            >
              <ion-select-option
                v-for="(alumno, i) in estudiantes"
                :key="i"
                :value="alumno.carnet"
                >{{ alumno.nombreE }}</ion-select-option
              >
            </ion-select>
            <br />
            <ion-select
              label="Materias"
              fill="solid"
              color="primary"
              v-model="idMaterias"
            >
              <ion-select-option
                v-for="(materia, i) in materias"
                :key="i"
                :value="materia.idMaterias"
                >{{ materia.nombreMateria }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col>
            <ion-row>
              <ion-col size="4">
                <ion-select
                  label="Evaluacion"
                  fill="solid"
                  color="primary"
                  v-model="nombreEvaluacion"
                >
                  <ion-select-option
                    v-for="(evaluacion, i) in evaluaciones"
                    :key="i"
                    :value="evaluacion"
                    >{{ evaluacion }}</ion-select-option
                  >
                </ion-select>
              </ion-col>
              <ion-col size="4" v-show="mostrarTipo">
                <ion-select
                  label="Tipo de evaluacion"
                  fill="solid"
                  color="primary"
                  v-model="nombreTipo"
                >
                  <ion-select-option
                    v-for="(tipo, i) in tiposEvalu"
                    :key="i"
                    :value="tipo"
                    >{{ tipo }}</ion-select-option
                  >
                </ion-select>
              </ion-col>
              <ion-col size="3">
                <ion-input
                  label="Porcentaje"
                  type="number"
                  fill="solid"
                  label-placement="floating"
                  v-model="porcentaje"
                  :clear-input="true"
                ></ion-input>
              </ion-col>
              <ion-col size="1">
                <ion-button color="primary" @click="agregarMaterias"
                  ><ion-icon slot="icon-only" :icon="add"></ion-icon
                ></ion-button>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col
            size="12"
            v-for="(materiaDato, i) in listEvaluaciones"
            :key="i"
          >
            <ion-item-sliding>
              <ion-item>
                <ion-label> Materia: {{ materiaDato.materia }} </ion-label>
                <ion-label v-if="materiaDato.tipo != ''">
                  Tipo de evaluacion: {{ materiaDato.tipo }}
                </ion-label>
                <ion-label>
                  evaluacion: {{ materiaDato.evaluacion }}
                </ion-label>
                <ion-label>
                  Porcentaje: {{ materiaDato.porcentaje }}%
                </ion-label>
              </ion-item>
              <ion-item-options side="end">
                <ion-item-option color="danger">
                  <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                </ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
            <br />
          </ion-col>
          <ion-col size="3">
            <ion-button
              v-show="agregarEvalus"
              expand="block"
              shape="round"
              color="primary"
              @click="agregarEvaluaciones"
              >Agregar evaluaciones</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-toast
        :duration="2500"
        :is-open="estadoAlerta"
        :message="mensaje"
        @didDismiss="estadoAlerta = false"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import axios from "axios";

import {
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonToast,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";

import { add, trash } from "ionicons/icons";

export default {
  name: "EvaluacionesView",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonIcon,
    Toolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonToast,
    IonButtons,
    IonBackButton,
  },
  data() {
    return {
      add,
      trash,
      materias: [],
      estudiantes: [],
      carnet: "",
      agregarEvalus: false,
      estadoAlerta: false,
      mensaje: "",
      idInscripcion: "",
      idMaterias: "",
      nombreMateria: "",
      valorMateria: "",
      nombreEvaluacion: "",
      nombreTipo: "",
      mostrarTipo: false,
      evaluaciones: ["Examen", "Tareas", "Participacion"],
      tiposEvalu: ["Practico", "Teorico"],
      porcentaje: 0,
      listEvaluaciones: [],
    };
  },
  methods: {
    getEstudiantes() {
      axios
        .get("http://localhost:8000/api/inscripcionEstudiante/select")
        .then((response) => {
          this.estudiantes = response.data.data;
        })
        .catch((error) => console.log("Hubo un error " + error));
    },

    getMaterias() {
      axios
        .get("http://localhost:8000/api/evaluaciones/materiasInscrip")
        .then((response) => {
          if (response.status == 200) {
            this.materias = response.data.data;
          } else {
            this.estadoAlerta = true;

            this.mensaje = "No hay materias registradas";
          }
        })
        .catch((error) => {
          this.estadoAlerta = true;

          this.mensaje = error;
        });
    },

    getidInscripcion(idMaterias) {
      axios
        .get(
          `http://localhost:8000/api/evaluaciones/idInscripcion/${this.carnet}/${idMaterias}`
        )
        .then((response) => {
          this.idInscripcion = response.data.data[0].idInscripcion;
          this.nombreMateria = response.data.data[0].nombreMateria;
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.estadoAlerta = true;

            this.mensaje =
              "Lo sentimos, el usuario no se ha inscrito a esta materia";

            this.idMaterias = "";
          }
        });
    },

    agregarMaterias() {
      let porcentajeMaterias = 0;
      let porcentajesPractico = 0;
      let porcentajesTeorico = 0;
      let porcentajeGlobal = 0;

      if (this.nombreMateria == "") {
        alert("No ha ingresado ninguna materia");
      } else if (this.nombreEvaluacion == "") {
        alert("No ha ingresado ninguna evaluacion");
      } else if (this.porcentaje == "") {
        alert("No ha ingresado un porcentaje");
      } else {
        if (this.nombreEvaluacion != "Participacion") {
          if (this.listEvaluaciones.length > 0) {
            this.agregarEvalus = true;

            for (let i in this.listEvaluaciones) {
              if (this.listEvaluaciones[i].materia == this.nombreMateria) {
                porcentajeMaterias =
                  porcentajeMaterias +
                  Number(this.listEvaluaciones[i].porcentaje);
              }

              if (
                this.listEvaluaciones[i].materia == this.nombreMateria &&
                this.listEvaluaciones[i].tipo == "Practico"
              ) {
                porcentajesPractico =
                  porcentajesPractico +
                  Number(this.listEvaluaciones[i].porcentaje);
              }

              if (
                this.listEvaluaciones[i].materia == this.nombreMateria &&
                this.listEvaluaciones[i].tipo == "Teorico"
              ) {
                porcentajesTeorico =
                  porcentajesTeorico +
                  Number(this.listEvaluaciones[i].porcentaje);
              }
            }

            porcentajeGlobal = porcentajeMaterias + Number(this.porcentaje);

            if (porcentajeGlobal > 100) {
              alert("LLego al limite");
            } else {
              if (this.nombreTipo == "Practico") {
                if (porcentajesPractico == 80) {
                  alert("No se puede ingresar un valor mayor al 80%");
                } else if (this.porcentaje > 80) {
                  alert("No se puede ingresar un valor mayor al 80%");
                } else {
                  let evaluacion = {
                    idInscripcion: this.idInscripcion,
                    materia: this.nombreMateria,
                    evaluacion: this.nombreEvaluacion,
                    tipo: this.nombreTipo,
                    porcentaje: this.porcentaje,
                  };

                  this.listEvaluaciones.push(evaluacion);

                  this.carnet = "";
                  this.idInscripcion = "";
                  this.idMaterias = "";
                  this.nombreMateria = "";
                  this.nombreEvaluacion = "";
                  this.nombreTipo = "";
                  this.porcentaje = 0;
                }
              } else {
                if (porcentajesTeorico == 20) {
                  alert("No se puede ingresar un valor mayor al 20%");
                } else if (this.porcentaje > 20) {
                  alert("No se puede ingresar un valor mayor al 20%");
                } else {
                  let evaluacion = {
                    idInscripcion: this.idInscripcion,
                    materia: this.nombreMateria,
                    evaluacion: this.nombreEvaluacion,
                    tipo: this.nombreTipo,
                    porcentaje: this.porcentaje,
                  };

                  this.listEvaluaciones.push(evaluacion);

                  this.carnet = "";
                  this.idInscripcion = "";
                  this.idMaterias = "";
                  this.nombreMateria = "";
                  this.nombreEvaluacion = "";
                  this.nombreTipo = "";
                  this.porcentaje = 0;
                }
              }
            }
          } else {
            if (this.nombreTipo == "Practico") {
              if (this.porcentaje > 80) {
                alert("No se puede ingresar un valor mayor al 80%");
              } else {
                let evaluacion = {
                  idInscripcion: this.idInscripcion,
                  materia: this.nombreMateria,
                  evaluacion: this.nombreEvaluacion,
                  tipo: this.nombreTipo,
                  porcentaje: this.porcentaje,
                };

                this.listEvaluaciones.push(evaluacion);

                this.carnet = "";
                this.idInscripcion = "";
                this.idMaterias = "";
                this.nombreMateria = "";
                this.nombreEvaluacion = "";
                this.nombreTipo = "";
                this.porcentaje = 0;
              }
            } else {
              if (this.porcentaje > 20) {
                alert("No se puede ingresar un porcentaje mayor al 20%");
              } else {
                let evaluacion = {
                  idInscripcion: this.idInscripcion,
                  materia: this.nombreMateria,
                  evaluacion: this.nombreEvaluacion,
                  tipo: this.nombreTipo,
                  porcentaje: this.porcentaje,
                };

                this.listEvaluaciones.push(evaluacion);

                this.carnet = "";
                this.idInscripcion = "";
                this.idMaterias = "";
                this.nombreMateria = "";
                this.nombreEvaluacion = "";
                this.nombreTipo = "";
                this.porcentaje = 0;
              }
            }
          }
        } else {
          for (let i in this.listEvaluaciones) {
            if (this.listEvaluaciones[i].materia == this.nombreMateria) {
              porcentajeMaterias =
                porcentajeMaterias +
                Number(this.listEvaluaciones[i].porcentaje);
            }
          }

          porcentajeGlobal = porcentajeMaterias + Number(this.porcentaje);

          if (porcentajeGlobal > 100) {
            alert("Llego al limite");
          } else {
            let evaluacion = {
              idInscripcion: this.idInscripcion,
              materia: this.nombreMateria,
              evaluacion: this.nombreEvaluacion,
              tipo: "",
              porcentaje: this.porcentaje,
            };

            this.listEvaluaciones.push(evaluacion);

            this.carnet = "";
            this.idInscripcion = "";
            this.idMaterias = "";
            this.nombreMateria = "";
            this.nombreEvaluacion = "";
            this.porcentaje = 0;
          }

          this.agregarEvalus = true;
        }
      }
    },

    agregarEvaluaciones() {
      if (this.listEvaluaciones.length > 0) {
        for (let i in this.listEvaluaciones) {
          let nombreEvaluacion = this.listEvaluaciones[i].evaluacion;
          let tipoEvaluacion = this.listEvaluaciones[i].tipo;
          let porcentaje = Number(this.listEvaluaciones[i].porcentaje) / 100;

          let datosEvalu = {
            idInscripcion: this.listEvaluaciones[i].idInscripcion,
            nombreEvaluacion: nombreEvaluacion,
            tipoEvaluacion: tipoEvaluacion,
            porcentaje: porcentaje,
          };

          axios
            .post("http://localhost:8000/api/evaluaciones/ingreso", datosEvalu)
            .catch((error) => {
              this.estadoAlerta = true;

              this.mensaje = "Hubo un error " + error;
            });
        }

        this.listEvaluaciones = [];

        this.estadoAlerta = true;

        this.mensaje = "Se han ingresado las evaluaciones con exito";

        this.agregarEvalus = false;
      } else {
        this.estadoAlerta = true;

        this.mensaje = "No se ha ingresado ninguna evaluacion";
      }
    },
  },
  watch: {
    idMaterias(nuevo) {
      if (nuevo != "") {
        this.getidInscripcion(nuevo);
      }
    },

    nombreEvaluacion(nuevo) {
      if (nuevo == "Examen" || nuevo == "Tareas") {
        this.mostrarTipo = true;
      } else {
        this.mostrarTipo = false;
      }
    },
  },
  mounted() {
    this.getMaterias();
    this.getEstudiantes();
  },
};
</script>
