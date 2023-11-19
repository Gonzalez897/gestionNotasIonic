<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title> Registro Docentes </ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-input
            label="nombre"
            label-placement="stacked"
            fill="outline"
            shape="round"
            maxlength="30"
            counter
            color="warning"
            v-model="datosProfesor.nombreProfesor"
          ></ion-input>
          <ion-input
            label="apellido"
            label-placement="stacked"
            fill="outline"
            shape="round"
            maxlength="30"
            counter
            color="warning"
            v-model="datosProfesor.apellidoProfesor"
          ></ion-input>
          <ion-button
            shape="round"
            expand="block"
            color="warning"
            @click="agregarProfesores"
            >Guardar</ion-button
          >
          <ion-toast
            :is-open="agregarMensaje"
            color="red"
            :message="respuestaAgregar"
            :duration="5000"
            @didDismiss="agregarMensaje = false"
            position="bottom"
            position-anchor="header"
          ></ion-toast>
        </ion-card-header>
        <ion-card-content>
          <ion-card>
            <ion-card-header>
              <ion-card-title>Profesor</ion-card-title>
              <ion-card-subtitle>Listado</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <template v-if="datosProfesor.length > 0">
                <ion-list>
                  <ion-item-sliding
                    v-for="(profesor, i) in datosProfesor"
                    :key="i"
                  >
                    <ion-item>
                      ID:
                      <ion-label>{{ profesor.idProfesores }}</ion-label> Name:
                      <ion-label>{{ profesor.nombreProfesor }}</ion-label>
                      Apellido:
                      <ion-label>{{ profesor.apellidoProfesor }}</ion-label>
                    </ion-item>

                    <ion-item-options side="end">
                      <ion-item-option
                        color="primary"
                        @click="getProfesor(profesor.idProfesores, 1)"
                      >
                        <ion-icon slot="icon-only" :icon="eye"></ion-icon>
                      </ion-item-option>
                      <ion-item-option
                        color="success"
                        @click="getProfesor(profesor.idProfesores, 2)"
                      >
                        <ion-icon slot="icon-only" :icon="create"></ion-icon>
                      </ion-item-option>
                      <ion-item-option
                        color="danger"
                        @click="eliminarProfesor(profesor.idProfesores)"
                      >
                        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                      </ion-item-option>
                    </ion-item-options>
                  </ion-item-sliding>
                </ion-list>
              </template>
              <p v-else>No hay Profesores</p>
            </ion-card-content>
          </ion-card>
          <ion-modal :is-open="modalProfesor">
            <ion-header>
              <ion-toolbar>
                <ion-title>Informacion del Profesor</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="modalProfesor = false">Close</ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <p>
                Id del Profesor: {{ profesor.idProfesores }} <br />
                Nombre del Profesor: {{ profesor.nombreProfesor }} <br />
                Correo del Profesor: {{ profesor.apellidoProfesor }}
              </p>
            </ion-content>
          </ion-modal>

          <ion-modal :is-open="modalActualizar">
            <ion-header>
              <ion-toolbar>
                <ion-title>Actualizar datos del Profesor</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="modalActualizar = false"
                    >Close</ion-button
                  >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <ion-input
                label="Nombre Profesor"
                label-placement="stacked"
                fill="outline"
                shape="round"
                maxlength="30"
                counter
                color="warning"
                v-model="profesor.nombreProfesor"
              ></ion-input>
              <ion-input
                label="edad"
                label-placement="stacked"
                fill="outline"
                shape="round"
                maxlength="30"
                counter
                color="warning"
                v-model="profesor.apellidoProfesor"
              ></ion-input>
              <ion-button
                shape="round"
                expand="block"
                color="warning"
                @click="editarProfesor(profesor.idProfesores)"
                >Guardar</ion-button
              >
            </ion-content>
          </ion-modal>
          <ion-toast
            :is-open="eliminarMensaje"
            color="red"
            :message="respuestaEliminar"
            :duration="5000"
            @didDismiss="eliminarMensaje = false"
          ></ion-toast>
          <ion-toast
            :is-open="actualizarMensaje"
            color="red"
            :message="respuestaActualizar"
            :duration="5000"
            @didDismiss="actualizarMensaje = false"
          ></ion-toast>
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonButton,
  IonButtons,
  IonInput,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonBackButton,
} from "@ionic/vue";

import Toolbar from "./Toolbar.vue";
import { Storage } from "@ionic/storage";

import axios from "axios";
import { eye, create, trash } from "ionicons/icons";

export default {
  name: "RegistroEstudiante",
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
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonButton,
    IonButtons,
    IonInput,
    IonToast,
    Toolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonBackButton,
  },
  data() {
    return {
      datosProfesor: {},
      agregarMensaje: false,
      respuestaAgregar: "",
      eye,
      create,
      trash,
      profesor: [],
      modalProfesor: false,
      modalActualizar: false,
      eliminarMensaje: false,
      actualizarMensaje: false,
      respuestaEliminar: "",
      respuestaActualizar: "",
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

      this.getProfesores();
    },
    agregarProfesores() {
      console.log(this.config);
      axios
        .post(
          "http://localhost:8000/api/profe/store",
          this.datosProfesor,
          this.config
        )
        .then((response) => {
          console.log(response);
          this.respuestaAgregar = response.data.data;
          this.agregarMensaje = true;
          this.datosProfesor = {};
        })
        .catch((error) => console.log("Hubo un error " + error));
    },
    getProfesores() {
      axios
        .get("http://localhost:8000/api/profe/select", this.config)
        .then((response) => {
          this.datosProfesor = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => "Hubo un error " + error);
    },
    getProfesor(idProfesores, action) {
      if (action == 1) {
        this.modalProfesor = true;
      } else {
        this.modalActualizar = true;
      }
      axios
        .get(
          `http://localhost:8000/api/profe/find/${idProfesores}`,
          this.config
        )
        .then((response) => {
          this.profesor = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => console.log("hubo un error " + error));
    },
    editarProfesor(idProfesores) {
      axios
        .put(
          `http://localhost:8000/api/profe/update/${idProfesores}`,
          this.profesor,
          this.config
        )
        .then((response) => {
          console.log(response);
          this.modalActualizar = false;

          this.actualizarMensaje = true;

          this.respuestaActualizar = response.data.data;

          this.getEstudiantes();
        })
        .catch((error) => console.log("hubo un error " + error));
    },
    eliminarProfesor(idProfesor) {
      axios
        .delete(
          `http://localhost:8000/api/profe/delete/${idProfesor}`,
          this.config
        )
        .then((response) => {
          console.log(response);

          this.respuestaEliminar = response.data.data;

          this.eliminarMensaje = true;

          this.getProfesores();
        })
        .catch((error) => console.log("hubo un error " + error));
    },
  },
  ionViewWillEnter() {
    this.getToken();
    this.modalProfesor = false;
  },
  mounted() {
    this.getToken();
    this.modalProfesor = false;
  },
};
</script>
