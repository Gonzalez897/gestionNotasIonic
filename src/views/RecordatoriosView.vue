<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> Recordatorios/Alertas</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <h2>Ingresar recordatorios</h2>
          <ion-col size="12">
            <ion-input
              label="id inscripcion"
              placeholder="ingrese el id de inscripcion"
              label-placement="floating"
              fill="solid"
              shape="round"
              :clear-input="true"
              v-model="datos.idInscripcion"
            ></ion-input>
            <br />
            <ion-input
              label="descripcion"
              placeholder="ingrese un recordatorio"
              label-placement="floating"
              fill="solid"
              shape="round"
              :clear-input="true"
              v-model="datos.descripcion"
            ></ion-input>
            <br />
            <ion-input
              label="fecha finalizacion"
              placeholder="fecha finalizacion del recordatorio"
              label-placement="floating"
              fill="solid"
              shape="round"
              color="pink"
              type="date"
              v-model="datos.fechaRecordatorio"
            ></ion-input>
            <br /><br />
            <ion-select
              fill="solid"
              label="seleccione sus materias"
              shape="round"
              v-model="nombreMateria"
            >
              <ion-select-option
                v-for="(inscrip, i) in inscripcion"
                :key="i"
                :value="inscrip.nombreMateria"
              >
                {{ inscrip.nombreMateria }}
              </ion-select-option>
            </ion-select>
          </ion-col>
          <ion-col>
            <ion-button
              shape="round"
              color="warning"
              expand="block"
              @click="agregarRecordatorio"
            >
              <b>guardar recordatorio</b>
            </ion-button>
          </ion-col>
          <ion-toast
            :is-open="ingresarM"
            @diDismiss="ingresarM = false"
            color="green"
            :duration="5000"
            :message="ingresarR"
          ></ion-toast>
        </ion-row>
      </ion-grid>
      <!-- <ion-item-group>
                <ion-item-sliding v-for="(valor,i) in listaRecor" :key="i">
                    <ion-item>
                        Descripcion:
                        <br>
                        <ion-label>{{ valor.descripcion }}</ion-label>
                        
                        fecha: 
                        <br>
                        <ion-label>{{ valor.fechaRecordatorio }}</ion-label>
                    </ion-item>
                    <ion-item-options>
                        <ion-item-option>modificar</ion-item-option>
                        <ion-item-option>Elminar</ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </ion-item-group>-->

      <!--Card visualizacion -->

      <ion-card>
        <ion-card-header>
          <ion-card-title>Recordatorios</ion-card-title>
          <ion-card-subtitle>Listado</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <template v-if="listaRecor.length > 0">
            <ion-list>
              <ion-item-sliding v-for="(valor, i) in listaRecor" :key="i">
                <ion-item-options side="start">
                  <ion-item-option color="success">
                    <ion-icon slot="icon-only"></ion-icon>
                  </ion-item-option>
                </ion-item-options>

                <ion-item>
                  <p>
                    descripcion:
                    <br />
                    <ion-label>{{ valor.descripcion }}</ion-label>
                    fecha finalizacion:
                    <br />
                    <ion-label>{{ valor.fechaRecordatorio }}</ion-label>
                  </p>
                </ion-item>

                <ion-item-options side="end">
                  <ion-item-option
                    color="primary"
                    @click="getRecordatorio(valor.idRecordatorios, 1)"
                  >
                    <ion-icon slot="icon-only" :icon="eye"></ion-icon>
                  </ion-item-option>
                  <ion-item-option
                    color="success"
                    @click="getRecordatorio(valor.idRecordatorios, 2)"
                  >
                    <ion-icon slot="icon-only" :icon="create"></ion-icon>
                  </ion-item-option>
                  <ion-item-option
                    color="danger"
                    @click="eliminarRecordatorio(valor.idRecordatorios)"
                  >
                    <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                  </ion-item-option>
                </ion-item-options>
              </ion-item-sliding>
            </ion-list>
          </template>
          <p v-else>no hay recordatorios</p>
        </ion-card-content>
      </ion-card>
      <!--prueba de modales-->
      <ion-modal :isOpen="modalUno">
        <ion-header>
          <ion-toolbar>
            <ion-title>datos recordatorio</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="modalUno = false">cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>id: {{ valor.idRecordatorios }}</p>
          <p>descripcion: {{ valor.descripcion }}</p>
          <p>fecha: {{ valor.fechaRecordatorio }}</p>
        </ion-content>
      </ion-modal>
      <!--modal 2-->
      <ion-modal :isOpen="modalDos">
        <ion-header>
          <ion-toolbar>
            <ion-title>editar recordatorio</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="modalDos = false">Cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>editar</p>
          <ion-input
            label="descripcion"
            label-placement="stacked"
            fill="outline"
            maxlength="60"
            counter
            shape="round"
            color="warning"
            v-model="valor.descripcion"
          >
          </ion-input>
          <ion-input
            label="fecha"
            label-placement="stacked"
            fill="outline"
            shape="round"
            color="warning"
            type="date"
            v-model="valor.fechaRecordatorio"
          >
          </ion-input>

          <ion-button
            @click="editarRecordatorio(valor.idRecordatorios)"
            color="warning"
            expand="block"
            shape="round"
            >editar recordatorio</ion-button
          >
        </ion-content>
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
      </ion-modal>
      <hr />
      <!--alertas-->
      <ion-grid>
        <h2>Alertas</h2>
        <ion-row>
          <ion-col size="12">
            <ion-select
              fill="solid"
              label="seleccione id del recordatorio"
              shape="round"
              v-model="alerta.idRecordatorios"
            >
              <ion-select-option
                v-for="(R, i) in recordatorio"
                :key="i"
                :value="R.idRecordatorios"
              >
                {{ R.idRecordatorios }}
              </ion-select-option>
            </ion-select>
            <br /><br />
            <ion-select
              fill="solid"
              label="seleccione recordatorio"
              shape="round"
              v-model="alerta.descripcion"
            >
              <ion-select-option
                v-for="(R, i) in recordatorio"
                :key="i"
                :value="R.descripcion"
              >
                {{ R.descripcion }}
              </ion-select-option>
            </ion-select>
            <br /><br />
            <ion-select
              fill="solid"
              label="fecha finalizacion"
              shape="round"
              v-model="alerta.fechaRecordatorio"
            >
              <ion-select-option
                v-for="(F, i) in recordatorio"
                :key="i"
                :value="F.fechaRecordatorio"
              >
                {{ F.fechaRecordatorio }}
              </ion-select-option>
            </ion-select>
            <br />
            <br />
            <ion-button
              shape="round"
              color="warning"
              expand="block"
              @click="agregarAlerta"
            >
              <b>iniciar alerta</b>
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-toast
          :is-open="ingresarAR"
          @diDismiss="ingresarAR = false"
          color="green"
          :duration="5000"
          :message="ingresarA"
        ></ion-toast>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonModal,
  IonToast,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonItemGroup,
} from "@ionic/vue";
import { trash, eye, create } from "ionicons/icons";
import Toolbar from "./Toolbar.vue";
import axios from "axios";

export default {
  name: "RecordatoriosVew",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
    IonInput,
    IonButton,
    IonList,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonItem,
    Toolbar,
    IonIcon,
    IonModal,
    IonToast,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonItemGroup,
  },
  data() {
    return {
      eye,
      create,
      trash,
      //recordatorios
      nombreR: "",
      nombreMateria: "",
      nombreId: "",
      inscripcion: [],
      recordatorio: {},
      ingresarM: false,
      ingresarR: "",
      listaRecor: [],
      modalUno: false,
      modalDos: false,
      valor: {},
      actualizarR: {},
      elminarR: "",
      eliminarMensaje: false,
      respuestaEliminar: false,
      actualizarMensaje: false,
      respuestaActualizar: false,
      //alertas recordatorios
      recordatorios: [],
      alerta: {
        idRecordatorios: "",
        descripcion: "",
        fechaRecordatorio: "",
      },
      ingresarAR: false,
      ingresarA: "",
      datos: {},
    };
  },
  methods: {
    obtenerInscripcion() {
      axios
        .get("http://localhost:8000/api/inscripcion/select")
        .then((response) => {
          console.log(response.data.data);
          this.inscripcion = response.data.data;
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    agregarRecordatorio() {
      axios
        .post("http://localhost:8000/api/recordatorios/store", this.datos)

        .then((response) => {
          console.log(response);

          this.datos = {};

          this.ingresarM = true;

          this.ingresarR = response.data.data;
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    getRecordatorios() {
      axios
        .get("http://127.0.0.1:8000/api/recordatorios/select")

        .then((response) => {
          console.log(response);

          this.listaRecor = response.data.data;
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    getRecordatorio(idRecordatorios, action) {
      //console.log(idRecordatorios)
      if (action == 1) {
        this.modalUno = true;
      } else {
        this.modalDos = true;
      }
      axios
        .get(`http://127.0.0.1:8000/api/recordatorios/find/${idRecordatorios}`)

        .then((response) => {
          this.valor = response.data.data;

          console.log(response.data.data);
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    editarRecordatorio(idRecordatorios) {
      axios
        .put(
          `http://127.0.0.1:8000/api/recordatorios/update/${idRecordatorios}`,
          this.valor
        )
        .then((response) => {
          console.log(response);

          this.modalDos = false;

          this.actualizarMensaje = true;

          this.respuestaActualizar = response.data.data;

          this.valor = response.data.data;

          this.getRecordatorios();
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    eliminarRecordatorio(idRecordatorios) {
      axios
        .delete(
          `http://127.0.0.1:8000/api/recordatorios/delete/${idRecordatorios}`
        )
        .then((response) => {
          console.log(response);

          this.respuestaEliminar = response.data.data;

          this.eliminarMensaje = true;

          this.getRecordatorios();
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    obtenerRecordatorios() {
      axios
        .get("http://localhost:8000/api/recordatorios/select")
        .then((response) => {
          console.log(response.data.data);
          this.recordatorio = response.data.data;
        })
        .catch((error) => console.log("ha ocurrido un error" + error));
    },
    agregarAlerta() {
      axios
        .post("http://localhost:8000/api/alertas/store", this.alerta)
        .then((response) => {
          console.log(response);

          this.alerta = {};

          this.ingresarA = response.data.data;

          this.ingresarAR = true;
        })
        .catch((error) => console.log("hubo un error") + error);
    },
  },
  mounted() {
    this.obtenerInscripcion();
    this.getRecordatorios();
    this.obtenerRecordatorios();
  },
};
</script>

<style scoped>
.pA {
  color: red;
}
</style>
