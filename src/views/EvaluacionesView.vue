<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Evaluaciones</ion-title>
                <Toolbar></Toolbar>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-select label="Materias" fill="solid" color="primary" v-model="nombreMateria">
                            <ion-select-option v-for="(materia, i) in materias" :key="i" :value="materia">{{ materia
                            }}</ion-select-option>
                        </ion-select>
                    </ion-col>
                    <ion-col>
                        <ion-row>
                            <ion-col size="4">
                                <ion-select label="Evaluacion" fill="solid" color="primary" v-model="nombreEvaluacion">
                                    <ion-select-option v-for="(evaluacion, i) in evaluaciones" :key="i"
                                        :value="evaluacion">{{ evaluacion }}</ion-select-option>
                                </ion-select>
                            </ion-col>
                            <ion-col size="4" v-show="mostrarTipo">
                                <ion-select label="Tipo de evaluacion" fill="solid" color="primary" v-model="nombreTipo">
                                    <ion-select-option v-for="(tipo, i) in tiposEvalu" :key="i" :value="tipo">{{ tipo
                                    }}</ion-select-option>
                                </ion-select>
                            </ion-col>
                            <ion-col size="3">
                                <ion-input label="Porcentaje" type="number" fill="solid" label-placement="floating"
                                    v-model="porcentaje" :clear-input="true"></ion-input>
                            </ion-col>
                            <ion-col size="1">
                                <ion-button color="primary" @click="agregarMaterias"><ion-icon slot="icon-only"
                                        :icon="add"></ion-icon></ion-button>
                            </ion-col>
                        </ion-row>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-item-sliding v-for="(materiaDato, i) in listEvaluaciones" :key="i">
                            <ion-item>
                                <ion-label>
                                    Materia: {{ materiaDato.materia }}&nbsp;&nbsp;&nbsp;
                                    evaluacion: {{ materiaDato.evaluacion }}&nbsp;&nbsp;&nbsp;&nbsp;
                                    <template v-if="materiaDato.tipo != ''">
                                        Tipo de evaluacion: {{ materiaDato.tipo }}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </template>
                                    Porcentaje: {{ materiaDato.porcentaje }}%</ion-label>
                            </ion-item>
                            <ion-item-options side="end">
                                <ion-item-option color="danger">
                                    <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                                </ion-item-option>
                            </ion-item-options>
                        </ion-item-sliding>
                        <br>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script>
import Toolbar from './Toolbar.vue';

import {
    IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonGrid,
    IonRow, IonCol, IonInput, IonButton, IonSelect, IonSelectOption, IonIcon,
    IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption
} from "@ionic/vue";

import { add, trash } from "ionicons/icons";

export default {
    name: 'EvaluacionesView',
    components: {
        IonPage, IonHeader, IonTitle, IonToolbar, IonContent, IonIcon,
        Toolbar, IonGrid, IonRow, IonCol, IonInput, IonButton, IonSelect, IonSelectOption,
        IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption
    },
    data() {
        return {
            add, trash,
            materias: ['Matematicas', 'Ciencias'],
            nombreMateria: '',
            nombreEvaluacion: '',
            nombreTipo: '',
            mostrarTipo: false,
            evaluaciones: ['Examen', 'Tareas', 'Participacion'],
            tiposEvalu: ['Practico', 'Teorico'],
            porcentaje: 0,
            listEvaluaciones: []
        }
    },
    methods: {

        agregarMaterias() {

            let sumaPorcentajes = 0;


            if (this.nombreEvaluacion == "Participacion") {

                for (let i in this.listEvaluaciones) {

                    if (this.listEvaluaciones[i].materia == this.nombreMateria) {

                        sumaPorcentajes = sumaPorcentajes + Number(this.listEvaluaciones[i].porcentaje);
                    }
                }

                sumaPorcentajes = Number(this.porcentaje) + sumaPorcentajes;

                if (sumaPorcentajes <= 100) {

                    let evaluacion = { materia: this.nombreMateria, evaluacion: this.nombreEvaluacion, tipo: '', porcentaje: this.porcentaje };

                    this.listEvaluaciones.push(evaluacion);

                    this.nombreMateria = "";
                    this.nombreEvaluacion = "";
                    this.nombreTipo = "";
                    this.porcentaje = 0;

                } else {

                    alert("Se ha sobrepasado al 100% de la materia");

                }



            } else {

                if (this.listEvaluaciones.length > 0) {

                    if (this.nombreTipo == "Practico") {
                        for (let i in this.listEvaluaciones) {

                            if (this.listEvaluaciones[i].materia == this.nombreMateria && this.nombreTipo == "Practico") {

                                sumaPorcentajes = sumaPorcentajes + Number(this.listEvaluaciones[i].porcentaje);
                            }

                        }

                        sumaPorcentajes = sumaPorcentajes + Number(this.porcentaje);

                        if (sumaPorcentajes <= 80 || this.porcentaje <= 80) {

                            console.log(this.listEvaluaciones);

                            let evaluacion = {
                                materia: this.nombreMateria, evaluacion: this.nombreEvaluacion,
                                tipo: this.nombreTipo, porcentaje: this.porcentaje
                            };

                            this.listEvaluaciones.push(evaluacion);

                            this.nombreMateria = "";
                            this.nombreEvaluacion = "";
                            this.nombreTipo = "";
                            this.porcentaje = 0;

                            sumaPorcentajes = 0;

                        } else {

                            alert("se ha pasado el limite de evaluaciones practicas");
                        }
                    } else {

                        for (let i in this.listEvaluaciones) {

                            if (this.listEvaluaciones[i].materia == this.nombreMateria && this.nombreTipo == "Teorico") {

                                sumaPorcentajes = sumaPorcentajes + Number(this.listEvaluaciones[i].porcentaje);
                            }

                        }

                        sumaPorcentajes = sumaPorcentajes + Number(this.porcentaje);

                        if (sumaPorcentajes <= 20 || this.porcentaje <= 20) {

                            let evaluacion = {
                                materia: this.nombreMateria, evaluacion: this.nombreEvaluacion,
                                tipo: this.nombreTipo, porcentaje: this.porcentaje
                            };

                            this.listEvaluaciones.push(evaluacion);

                            this.nombreMateria = "";
                            this.nombreEvaluacion = "";
                            this.nombreTipo = "";
                            this.porcentaje = 0;

                            sumaPorcentajes = 0;

                        } else {

                            alert("se ha pasado el limite de evaluaciones teoricas");

                        }

                    }

                } else {

                    if (this.nombreTipo == "Practico") {

                        if (this.porcentaje > 80) {

                            alert("No se puede ingresar un valor mayor al 80%");

                        } else {

                            let evaluacion = {
                                materia: this.nombreMateria, evaluacion: this.nombreEvaluacion,
                                tipo: this.nombreTipo, porcentaje: this.porcentaje
                            };

                            this.listEvaluaciones.push(evaluacion);

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
                                materia: this.nombreMateria, evaluacion: this.nombreEvaluacion,
                                tipo: this.nombreTipo, porcentaje: this.porcentaje
                            };

                            this.listEvaluaciones.push(evaluacion);

                            this.nombreMateria = "";
                            this.nombreEvaluacion = "";
                            this.nombreTipo = "";
                            this.porcentaje = 0;

                        }

                    }

                }

            }

        }

    },
    watch: {

        nombreEvaluacion(nuevo) {

            if (nuevo == "Examen" || nuevo == "Tareas") {

                this.mostrarTipo = true;

            } else {

                this.mostrarTipo = false;

            }

        }
    }
}
</script>