<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button color="primary"></ion-menu-button>
				</ion-buttons>
				<ion-title>{{ $t('headers.collections.index') }}</ion-title>

				<ion-buttons slot="end">
					<ion-button color="primary" v-on:click="$router.push({name: 'add_collection'})">
						<ion-icon :icon="addOutline"></ion-icon>
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<!-- Content -->
			<div v-if="loading == true" style="text-align: center; padding-top: 2rem">
				<p>Loading Collections...</p>
			</div>
			<ion-list ref="sliding_list" class="collections-box" v-if="collections.length > 0">
				<TransitionGroup name="list" tag="div">
					<collection-component-vue v-for="c in collections" :key="c.id" :collection-data="c"
						@removed="removeFromCollections" @closeSlide="closeSlides()" />
				</TransitionGroup>
			</ion-list>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import CollectionComponentVue from '@/components/CollectionComponent.vue';
import { defineComponent } from 'vue'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonList } from '@ionic/vue'
import { addOutline } from 'ionicons/icons';
import { onBeforeRouteUpdate } from 'vue-router';


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
	props: {
		refresh: {
			type: String,
			default: 'false',
		}
	},
	data(){
		return {
			collections: [] as CollectionData[],
			loading: true,
		}
	},
	setup(){
		return {
			addOutline,
		}
	},
	created(){
		this.getCollections();
	},
	watch: {
		'$route'() {
			if(this.$route.params.refresh){
				this.getCollections();
			}
		}
	},
	// beforeRouteUpdate(){
	// 	console.log('updated');
	// 	this.getCollections();
	// },
	methods: {
		closeSlides(){
			let list: any = this.$refs.sliding_list;
			list.$el.closeSlidingItems();
		},
		getCollections(){
			this.axios.get('/collections').then(response => {
				this.loading = false;
				if (!response.data.data) return;
				this.collections = response.data.data;
			}).catch(error => {
				console.log(error);
				this.loading = false;
			});
		},
		removeFromCollections(id: number){
			this.closeSlides();
			this.collections = this.collections.filter((c: CollectionData) => c.id != id);
		}
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

.list-enter-active,
.list-leave-active {
	transition: opacity 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
}
</style>

