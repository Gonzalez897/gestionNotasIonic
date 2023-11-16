<template>
 <ion-page>
    <ion-header>
        <ion-toolbar>
                
                <ion-title>
                    recordatorios
                </ion-title>
                <Toolbar></Toolbar>
            </ion-toolbar>
            
    </ion-header>
    <ion-content class="ion-padding">
        <ion-grid>
            <ion-row>
                <h2>ingresar recordatorios</h2>
                <ion-col size="12">
                    <ion-input
                    label="id materia"
                    placeholder="ingrese el id de la materia"
                    label-placement="floating" 
                    fill="solid" 
                    shape="round"
                    :clear-input="true"
                    v-model="recordatorio.idMaterias"></ion-input>
                    <br>
                    <ion-input
                    label="descripcion"
                    placeholder="ingrese un recordatorio"
                    label-placement="floating" 
                    fill="solid" 
                    shape="round"
                    :clear-input="true"
                    v-model="recordatorio.descripcion"></ion-input>
                    <br>
                    <ion-input
                    label="fecha"
                    placeholder="ingrese la fecha del recordatorio"
                    label-placement="floating"
                    fill="solid"
                    shape="round"
                    color="pink"
                    type="date"
                    v-model="recordatorio.fechaRecordatorio"
                    ></ion-input>
                    <br><br>
                    <ion-select 
                    fill="solid"
                    label="seleccione sus materias"
                    shape="round"
                    v-model="nombreMateria"
                    >
                    <ion-select-option v-for="(materia,i) in materias" :key="i" :value="materia.idMaterias">
                        {{ materia.nombreMateria }}
                    </ion-select-option>
                    </ion-select>
                </ion-col>
                <ion-col>
                    <ion-button 
                    shape="round"
                    color = "success"
                    @click="agregarRecordatorio">
                        guardar recordatorio
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>
        
    </ion-content>
    <ion-toast :is-open="ingresarM" @diDismiss="ingresarM=false" color="green" :duration="5000" :message="ingresarR"
    ></ion-toast>
 </ion-page>
    
    
</template>

<script>
import { 
    IonPage,IonHeader
    ,IonToolbar,
    IonButtons,IonMenuButton
    ,IonTitle,IonContent,
    IonGrid,IonCol,IonRow,IonInput,IonButton,IonList,IonItem,
    IonLabel,IonSelect,IonSelectOption,IonIcon,IonModal,IonToast,
    IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,
    IonItemSliding,IonItemOption,IonItemOptions

} from '@ionic/vue'
import Toolbar from './Toolbar.vue';
import axios from 'axios';

export default{
    name: 'RecordatoriosVew',
    components:{
        IonPage,IonHeader,IonToolbar,
        IonButtons,IonMenuButton,IonTitle,
        IonContent,IonGrid,IonCol,IonRow,IonInput,IonButton,IonList,
        IonSelect,IonSelectOption,IonLabel,IonItem,Toolbar,IonIcon,IonModal,IonToast,
        IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,
        IonItemSliding,IonItemOption,IonItemOptions
    }, 
    data(){
        return{ 
            nombreMateria:'',
            materias:[], 
            recordatorio: {

            }, 
            ingresarM: false,
            ingresarR: '', 
            //descripcion: '',
            //fechaRecordatorio:'',

        }
    },
    methods:{
        obtenerMaterias(){
            axios.get('http://localhost:8000/api/materias/select')
            .then(response=>{
                console.log(response.data.data)
                this.materias = response.data.data
            })
            .catch(error => console.log('ha ocurrido un error'+ error))
        },
        agregarRecordatorio(){
            

            axios.post('http://localhost:8000/api/recordatorios/store', this.recordatorio)

            .then(response =>{
                console.log(response)
                
                this.recordatorio = {}

                this.ingresarM = true
                
            })
            .catch(error => console.log('ha ocurrido un error' + error))
        },
        getRecordatorios(){
            axios.get('http://127.0.0.1:8000/api/recordatorios/select')

            .then(response=>{
                console.log(response)

                this.recordatorios = response.data.data

            })
            .catch(error => console.log('ha ocurrido un error' + error))
        }
        
    },
    mounted(){
        this.obtenerMaterias();
       
       
    }
    
}
</script>

<style scoped>

</style>