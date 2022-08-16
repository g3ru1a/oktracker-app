<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
				<ion-title>{{ $t('menu.collections') }}</ion-title>

				<ion-buttons slot="end">
					<ion-button color="primary">
						<ion-icon :icon="addOutline"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<!-- Content -->
			<ion-list class="collections-box" v-if="collections.length > 0">
				<collection-component-vue v-for="c in collections" :key="c.id" :collection-data="c" />
				
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import CollectionComponentVue from '@/components/CollectionComponent.vue';
import { defineComponent } from 'vue'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonList } from '@ionic/vue'
import { addOutline } from 'ionicons/icons';


export type CollectionData = {
	id: number
	name: string
	total_books: number
	total_cost: number
	currency: string
}

export default defineComponent({
	name: 'CollectionsPage',
	components: {
		IonButtons,
		IonContent,
		IonHeader,
		IonMenuButton,
		IonPage,
		IonTitle,
		IonToolbar,
		CollectionComponentVue,
		IonButton,
		IonIcon,
		IonList
	},
	data(){
		return {
			collections: [] as CollectionData[],
		}
	},
	setup(){
		return {
			addOutline,
		}
	},
	mounted(){
		this.axios.get('/collections').then(response => {
			console.log(response);
			if(!response.data.data) return;
			this.collections = response.data.data;
			console.log(this.collections);
			
		}).catch(error => {
			console.log(error);
		})
	}
})
</script>

<style scoped>

.collections-box {
	background: transparent;
}
body:not(.dark) ion-content {
	--ion-background-color: var(--ion-color-light);
}
</style>

