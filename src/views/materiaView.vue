<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ingrese Materia y Docente</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Materia</ion-label>
          <ion-input v-model="materia.nombreMateria"></ion-input>
        </ion-item>
        <ion-item
          ><br />
          <ion-input position="floating">Docente</ion-input>
          <ion-select v-model="materia.idProfesores">
            <ion-select-option
              v-for="(x, i) in profesor"
              :key="i"
              :value="x.idProfesores"
            >
              {{ x.nombreProfesor }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-button expand="block" @click="guardarFormulario()"
          >Guardar</ion-button
        >
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import Toolbar from "./Toolbar.vue";
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
} from "@ionic/vue";
import axios from "axios";

export default {
  name: "MateriaView",
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
    Toolbar,
  },
  data() {
    return {
      materia: {
        // nombreMateria: '',
        // idProfesor:''
      },
      profesor: [],
    };
  },
  methods: {
    guardarFormulario() {
      // Aquí puedes realizar acciones con los datos ingresados, como enviarlos a un servidor o guardarlos localmente.
      axios
        .post("http://127.0.0.1:8000/api/Materia/store", this.materia)
        .then((response) => {
          alert("se ha ingresado la materia");
          this.materia.nombreMateria = "";
          this.materia.idProfesor = "";
        })
        .catch((error) =>
          console.log("Hubo un error al tratar de ingresar la materia " + error)
        );
      // console.log('Materia:', this.materia);
      // console.log('Docente:', this.docente);

      // // Para limpiar los campos después de guardar los datos
      // this.materia = '';
      // this.docente = '';
    },
    guardarDocente() {
      axios
        .get("http://127.0.0.1:8000/api/profesores/select")
        .then((response) => {
          console.log(response.data.data);
          if (response.data.code == 200) {
            this.profesor = response.data.data;
          }
        });
    },
  },
  mounted() {
    this.guardarDocente();
  },
};
</script>

<style scoped>
/* Estilos opcionales para el formulario */
ion-list {
  padding: 20px;
}
</style>
