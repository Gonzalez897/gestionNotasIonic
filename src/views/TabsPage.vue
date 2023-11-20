<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="inicio" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="apps" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="registros" href="/tabs/tab12">
          <ion-icon aria-hidden="true" :icon="albums" />
          <ion-label>Registros</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="notas" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="book" />
          <ion-label>Notas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="materias" href="/tabs/tab4">
          <ion-icon aria-hidden="true" :icon="clipboard" />
          <ion-label>Materias</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="recordatorios" href="/tabs/tab5">
          <ion-icon aria-hidden="true" :icon="alarm" />
          <ion-label>Recordatorios</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { albums, book, clipboard, alarm, apps } from "ionicons/icons";
</script>
