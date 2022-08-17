<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button color="primary"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ $t('headers.collections.add') }}</ion-title>

                <ion-buttons slot="end">
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <!-- Content -->
            <div class="flex-box">
                <ion-card class="input-box">
                    <ion-item>
                        <ion-label position="floating">
                            {{ $t('labels.collection.add.name') }}
                        </ion-label>
                        <ion-input v-model="name" type="text" maxlength="40" :placeholder="$t('placeholders.collection.add.name')">
                        </ion-input>
                        <ion-note v-show="nameError != ''" color="danger" v-html="nameError"></ion-note>
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">
                            {{ $t('labels.collection.add.currency') }}
                        </ion-label>
                        <ion-select v-model="currency" interface="action-sheet" :placeholder="$t('placeholders.collection.add.currency')">
                            <ion-select-option v-for="s in currencies" :key="s.currency" :value="s.abbreviation"
                                v-html="s.symbol+ ' - ' +s.currency"></ion-select-option>
                        </ion-select>

                    </ion-item>
                    <ion-button v-on:click="createCollection()" expand="block" ref="submitButton">{{$t('buttons.create')}}</ion-button>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import currencies from '@/currencies.json';
import { defineComponent } from 'vue'
import { IonPage, IonHeader, IonNote, IonContent, IonToolbar, IonButtons, IonButton, IonInput, IonLabel, IonItem, IonBackButton,  IonTitle, IonCard, IonSelect, IonSelectOption } from '@ionic/vue';
export default defineComponent({
    name: 'AddCollectionPage',
    components: {
        IonPage, IonHeader, IonContent, IonNote, IonBackButton, IonToolbar, IonButtons, IonTitle, IonInput, IonLabel, IonItem, IonSelect, IonSelectOption, IonCard, IonButton,
    },
    data(){
        return {
            currencies: currencies,
            currency: '',
            name: '',
            nameError: '',
        }
    },
    methods: {
        createCollection() {
            this.buttonState(false);
            this.nameError = '';
            if (this.currency == '') this.currency = "USD";
            this.axios.post('/collections', {name: this.name, currency: this.currency})
                .then(response => {
                    this.name = '';
                    this.currency = '';
                    this.buttonState(true);
                    this.$router.push({ name: 'collections_list', params: {refresh: 'true'} });
                })
            .catch(error => {
                this.buttonState(true);
                let data = error.response.data;
                if(!data) return;
                if(data.errors?.name){
                    this.nameError = this.$t('errors.collections.add.blank_name');
                }
            });
        },
        buttonState(enabled = false){
            let button: any = this.$refs.submitButton;
            if (enabled) {
                button.$el.disabled = false;
                button.$el.innerHTML = this.$t('buttons.create');
            }else{
                button.$el.disabled = true;
                button.$el.innerHTML = this.$t('buttons.loading');
            }
        }
    }
})
</script>

<style scoped>
ion-label {
    padding-bottom: 1rem;
}
ion-select {
    min-width: 100% !important;
    text-align: left;
}
.flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    height: 100%;
}

.input-box {
    width: 90%;
    border-radius: 10px;
    text-align: center;
    padding: .5rem;
}
</style>
