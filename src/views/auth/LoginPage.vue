<template>
    <ion-page>
        <ion-content :fullscreen="true">
            {{$route.fullPath.includes('/auth')}}
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage } from "@ionic/vue";

export default defineComponent({
   name: 'LoginPage',
   components: {
    IonPage
   },
});

</script>