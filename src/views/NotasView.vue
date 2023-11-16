<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Visualizacion de Notas</ion-title>
        <Toolbar></Toolbar>
      </ion-toolbar>
      <!-- <Toolbar></Toolbar> -->
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-input fill="solid" placeholder="ID Notas"></ion-input><br />
          </ion-col>
          <ion-col>
            <ion-input fill="solid" placeholder="Notas"></ion-input><br />
          </ion-col>
          <ion-col>
            <ion-input fill="solid" placeholder="Carnet"></ion-input><br />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-input fill="solid" placeholder="ID Evaluaciones"></ion-input
            ><br />
          </ion-col>
          <ion-col>
            <ion-label>País</ion-label>
            <ion-select v-model="model" interface="action-sheet" :value="model">
              <ion-select-option
                v-for="student in estudiante"
                :key="student.carnet"
                :value="student.carnet"
              >
                {{ student.nombreEstudiante }}
              </ion-select-option>
              //Intenta similar con docentes </ion-select
            ><br />
            <ion-select v-model="model" interface="action-sheet" :value="model">
              <ion-select-option
                v-for="teacher in profesor"
                :key="teacher.carnet"
                :value="teacher.carnet"
              >
                {{ student.nombreEstudiante }}
              </ion-select-option>
              //Intenta similar con docentes </ion-select
            ><br />
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
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
    IonGrid,
    IonRow,
    IonCol,
    Toolbar,
  },
  data() {
    return {
      getStudent() {
        axios
          .get("http://127.0.0.1:8000/api/estudiante/select", this.config)
          .then((response) => {
            if (response.data.code == 200) {
              console.log(response);
              this.estudiante = response.data.data;
            }
          })
          .catch((error) => console.log("Ha ocurrido un wrong" + error));
      },
    };
  },
};
</script>
