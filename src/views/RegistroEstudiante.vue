<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title> Registro de Estudiantes </ion-title>
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
            v-model="estudiante.nombreEstudiante"
          ></ion-input>
          <ion-input
            label="apellido"
            label-placement="stacked"
            fill="outline"
            shape="round"
            maxlength="30"
            counter
            color="warning"
            v-model="estudiante.apellidoEstudiante"
          ></ion-input>
          <ion-button
            shape="round"
            expand="block"
            color="warning"
            @click="agregarEstudiante"
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
              <ion-card-title>Estudiante</ion-card-title>
              <ion-card-subtitle>Listado</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <template v-if="datosEstudiante.length > 0">
                <ion-list>
                  <ion-item-sliding
                    v-for="(estudiante, i) in datosEstudiante"
                    :key="i"
                  >
                    <ion-item>
                      Name:
                      <ion-label>{{ estudiante.nombreEstudiante }}</ion-label>
                      Apellido:
                      <ion-label>{{ estudiante.apellidoEstudiante }}</ion-label>
                    </ion-item>

                    <ion-item-options side="end">
                      <ion-item-option
                        color="primary"
                        @click="getEstudiante(estudiante.carnet, 1)"
                      >
                        <ion-icon slot="icon-only" :icon="eye"></ion-icon>
                      </ion-item-option>
                      <ion-item-option
                        color="success"
                        @click="getEstudiante(estudiante.carnet, 2)"
                      >
                        <ion-icon slot="icon-only" :icon="create"></ion-icon>
                      </ion-item-option>
                      <ion-item-option
                        color="danger"
                        @click="eliminarEstudiante(estudiante.carnet)"
                      >
                        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                      </ion-item-option>
                    </ion-item-options>
                  </ion-item-sliding>
                </ion-list>
              </template>
              <p v-else>No hay Estudiantes</p>
            </ion-card-content>
          </ion-card>
          <ion-modal :is-open="modalEstudiante">
            <ion-header>
              <ion-toolbar>
                <ion-title>Informacion del Estudiante</ion-title>
                <ion-buttons slot="end">
                  <ion-button @click="modalEstudiante = false"
                    >Close</ion-button
                  >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <p>
                Carné del Estudiante: {{ estudiante.carnet }} <br />
                Nombre del Estudiante: {{ estudiante.nombreEstudiante }} <br />
                Correo del Estudiante: {{ estudiante.apellidoEstudiante }}
              </p>
            </ion-content>
          </ion-modal>

          <ion-modal :is-open="modalActualizar">
            <ion-header>
              <ion-toolbar>
                <ion-title>Actualizar datos del estudiante</ion-title>
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
                v-model="estudiante.nombreEstudiante"
              ></ion-input>
              <ion-input
                label="edad"
                label-placement="stacked"
                fill="outline"
                shape="round"
                maxlength="30"
                counter
                color="warning"
                v-model="estudiante.apellidoEstudiante"
              ></ion-input>
              <ion-button
                shape="round"
                expand="block"
                color="warning"
                @click="editarEstudiante(estudiante.carnet)"
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
import Toolbar from "./Toolbar.vue";
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
  IonCol,
  IonRow,
  IonBackButton,
} from "@ionic/vue";
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
    IonCol,
    IonRow,
    IonBackButton,
  },
  data() {
    return {
      datosEstudiante: [],
      agregarMensaje: false,
      respuestaAgregar: "",
      eye,
      create,
      trash,
      estudiante: {},
      modalEstudiante: false,
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

      this.getEstudiantes();
    },
    agregarEstudiante() {
      axios
        .post(
          "http://localhost:8000/api/estudiante/store",
          this.estudiante,
          this.config
        )
        .then((response) => {
          console.log(response);
          this.respuestaAgregar = response.data.data;
          this.agregarMensaje = true;
          this.estudiante = {};
          this.getEstudiantes();
        })
        .catch((error) => console.log("Hubo un error " + error));
    },
    getEstudiantes() {
      axios
        .get("http://localhost:8000/api/estudiante/select", this.config)
        .then((response) => {
          this.datosEstudiante = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => "Hubo un error " + error);
    },
    getEstudiante(carnet, action) {
      if (action == 1) {
        this.modalEstudiante = true;
      } else {
        this.modalActualizar = true;
      }
      axios
        .get(`http://localhost:8000/api/estudiante/find/${carnet}`, this.config)
        .then((response) => {
          this.estudiante = response.data.data;
          console.log(response.data.data);
        })
        .catch((error) => console.log("hubo un error " + error));
    },
    editarEstudiante(carnet) {
      axios
        .put(
          `http://localhost:8000/api/estudiante/update/${carnet}`,
          this.estudiante,
          this.config
        )
        .then((response) => {
          console.log(response);
          this.modalActualizar = false;

          this.actualizarMensaje = true;

          this.respuestaActualizar = response.data.data;

          this.getProfesores();
        })
        .catch((error) => console.log("hubo un error " + error));
    },
    eliminarEstudiante(carnet) {
      axios
        .delete(
          `http://localhost:8000/api/estudiante/delete/${carnet}`,
          this.config
        )
        .then((response) => {
          console.log(response);

          this.respuestaEliminar = response.data.data;

          this.eliminarMensaje = true;

          this.getEstudiantes();
        })
        .catch((error) => console.log("hubo un error " + error));
    },
  },
  ionViewWillEnter() {
    this.getToken();
    this.modalEstudiante = false;
  },
  mounted() {
    this.getToken();
    this.modalEstudiante = false;
  },
};
</script>
