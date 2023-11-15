<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>
                    Login
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-input label="Correo Electronico" label-placement="floating" fill="solid" shape="round"
                            :clear-input="true" placeholder="Ingrese su correo electronico"
                            v-model="usuario.email"></ion-input>
                        <br>
                        <ion-input label="Contraseña" label-placement="floating" shape="round" fill="solid"
                            :clear-input="true" placeholder="Ingrese su contraseña" type="password"
                            v-model="usuario.password"></ion-input>
                        <br>
                        <ion-button shape="round" color="primary" expand="block" @click="login">Iniciar sesion</ion-button>
                        <br>
                        <ion-button shape="round" color="secondary" expand="block" router-link="/registro">Registrar usuario</ion-button>
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
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonRow, IonGrid, IonCol, IonButton, IonInput, IonToast,
    IonMenuButton, IonButtons
} from '@ionic/vue';

import { informationCircleOutline } from "ionicons/icons";

import axios from 'axios';

export default {
    name: 'LoginView',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
        IonRow, IonGrid, IonCol, IonButton, IonInput, IonToast,
        IonMenuButton, IonButtons
    },
    data() {
        return {
            informationCircleOutline,
            usuario: {
                email: '',
                password: ''
            },
            estadoMensaje: false,
            mensaje: ''
        }
    },
    methods: {
        login() {

            axios.post('http://localhost:8000/api/loginUsuario', this.usuario)
                .then(response => {

                    if (response.status == 200) {

                        this.estadoMensaje = true;
                        this.mensaje = "Usuario autorizado";

                        this.$storage.set('token', response.data.token);

                        this.$storage.set('user', response.data.data.name);

                        this.$router.push('/tabs/tab1');

                        this.usuario = {};

                    }

                })
                .catch(error => {
                    this.estadoMensaje = true;

                    if (error.response.status == 401) {

                        this.mensaje = error.response.data.data;

                    } else {

                        this.mensaje = "Ha ocurrido un error";

                    }
                });

        }
    }

}
</script>