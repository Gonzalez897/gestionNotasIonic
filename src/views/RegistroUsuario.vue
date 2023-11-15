<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Registro de Usuarios</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-input
                        label="Nombre de usuario"
                        label-placement="floating"
                        fill="solid"
                        shape="round"
                        placeholder="Ingresar nombre de usuario"
                        :clear-input="true"
                        type="text" v-model="nuevoUsuario.name"></ion-input>
                        <br>
                        <ion-input
                        label="Correo electronico"
                        label-placement="floating"
                        fill="solid"
                        shape="round"
                        placeholder="Ingresar un correo electronico"
                        :clear-input="true"
                        type="email" v-model="nuevoUsuario.email"></ion-input>
                        <br>
                        <ion-input 
                        label="Contraseña" 
                        type="password" 
                        label-placement="floating"
                        fill="solid"
                        shape="round"
                        placeholder="Ingrese una contraseña"
                        :clear-input="true" v-model="nuevoUsuario.password"></ion-input>
                        <br>
                        <ion-button
                        @click="ingresarUsuario"
                        fill="solid" 
                        color="success" 
                        shape="round" 
                        expand="block">Ingresar usuario</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-toast :duration="2500" :message="mensaje" :is-open="estadoMensaje" @didDimiss="estadoMensaje = false"
            :icon="informationCircleOutline"></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script>
import { 
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonButton, IonButtons, IonBackButton,
    IonContent, IonGrid, IonRow, IonCol,
    IonInput, IonToast
 } from "@ionic/vue";

import { informationCircleOutline } from 'ionicons/icons'

import axios from "axios";

export default {
    name: 'RegistroUsuario',
    components: {
       IonPage, IonHeader, IonToolbar, IonTitle,
       IonButton, IonButtons, IonBackButton,
       IonContent, IonGrid, IonRow, IonCol,
       IonInput, IonToast 
    },
    data() {
        return {
            informationCircleOutline,
            mensaje: '',
            estadoMensaje: false,
            nuevoUsuario : {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {

        ingresarUsuario() {

            axios.post('http://localhost:8000/api/ingresoUsuario', this.nuevoUsuario)
            .then(response => {

                if (response.data.code == 200) {

                    this.estadoMensaje = true;
                    this.mensaje = response.data;
    
                    this.nuevoUsuario = {};
                } else {

                    this.estadoMensaje = true;
                    this.mensaje = "Hubo un error al ingresar el usuario";

                }
            })
            .catch(error => console.log('Hubo un error ' + error))

        }
    }
}
</script>