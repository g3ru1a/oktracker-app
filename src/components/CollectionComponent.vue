<template>
    <ion-item-sliding class="box">
        <ion-item-options class="slide-option" side="start">
            <ion-button color="primary" class="slide-button">{{$t('buttons.share')}}</ion-button>
        </ion-item-options>

        <ion-item>
            <ion-card v-on:click="openCollection()" class="card">
                <h4>{{collectionData.name}}</h4>
                <div class="stat-container">
                    <div class="stat-item">
                        <ion-icon :icon="bookOutline"></ion-icon>
                        <p>{{collectionData.total_books}}</p>
                    </div>
                    <div class="stat-item">
                        <ion-icon :icon="walletOutline"></ion-icon>
                        <p>{{collectionData.total_cost}} {{collectionData.currency}}</p>
                    </div>
                </div>
            </ion-card>
        </ion-item>

        <ion-item-options class="slide-option" side="end" ref="slide">
            <ion-button color="warning" class="slide-button" v-on:click="openEdit()">{{$t('buttons.edit')}}</ion-button>
            <ion-button color="danger" class="slide-button" v-on:click="deleteCollection()">{{$t('buttons.delete')}}
            </ion-button>
        </ion-item-options>
    </ion-item-sliding>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CollectionData } from '@/views/user/collections/CollectionsPage.vue';
import { bookOutline, walletOutline } from 'ionicons/icons';
import { IonCard, IonIcon, IonButton, IonItemSliding, IonItem, IonItemOptions } from '@ionic/vue';

export default defineComponent({
	name: 'CollectionsComponent',
    props: {
        collectionData: {
            type: Object as PropType<CollectionData>,
            required: true,
        },
    },
	components: {
        IonCard, IonIcon, IonItem, IonItemOptions, IonItemSliding, IonButton
	},
    setup(){
        return {
            bookOutline, walletOutline
        }
    },
    methods: {
        openCollection(){
            console.log('clicked');
        },
        openEdit() {
            this.$router.push({ name: 'edit_collection', params: { collection_id: this.collectionData.id } });
            this.$emit('closeSlide');
        },
        deleteCollection(){
            this.axios.delete('/collections/' + this.collectionData.id)
                .then(response => {
                    this.$emit('removed', this.collectionData.id);
                })
                .catch(error => {
                    console.log(error);
                    
                });
        }
    }
})
</script>

<style scoped>





ion-icon {
    font-size: 25px;
}

.stat-item > p {
    margin-bottom: 0;
}

.card > h4 {
    max-width: 50%;
    text-align: left;
    font-size: 22px;
}

.stat-container{
    width: 50%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
}

.stat-item {
    width: 50%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.card {
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    box-shadow: none;
    color: var(--ion-color-text);

}

.box {
    margin: 1rem;
    width: auto;
    border-radius: 10px;
    border-style: solid;
    border-width: 0 3px 0 3px;
    border-color: var(--ion-color-primary-tint);
}

body:not(.dark) .box{
    --ion-background-color: var(--ion-background-color);
    box-shadow: 0 5px 5px gainsboro;
}

body:not(.dark) .slide-option{
    --ion-background-color:red;
}

.slide-button {
    height: 100%;
    text-align: left;
    border-radius: 0;
    margin:0;
}

.slide-option {
    border-radius: 10px;
}

ion-button{
    --border-radius: 0;
}

body.dark .box{
    border-color: var(--ion-color-primary-tint);
}

</style>