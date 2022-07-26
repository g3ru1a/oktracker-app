<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="center-vert">
				<ion-card style="width: 90%; padding: 10px">
					<div v-if="error != null">
						<ion-item class="text-center text-small" color="danger">{{ error }}</ion-item>
					</div>
					<ion-item :class="emailError != null ? 'ion-invalid':''">
						<ion-label><ion-icon :icon="mailOutline"></ion-icon></ion-label>
						<ion-input v-model="email" type="email" :placeholder="$t('placeholders.email_address')" />
						<ion-note slot="error">Error Text</ion-note>
					</ion-item>
					<ion-item>
						<ion-label><ion-icon :icon="lockClosedOutline"></ion-icon></ion-label>
						<ion-input v-model="password" type="password" :placeholder="$t('placeholders.password')" />
					</ion-item>
					<ion-button v-on:click="login()" expand="block">{{$t('buttons.login')}}</ion-button>
				</ion-card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonInput, IonLabel, IonItem, IonButton, IonCard, IonIcon, IonNote } from '@ionic/vue'
import { lockClosedOutline, mailOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'LoginPage',
	components: {
		IonPage,
		IonInput,
		IonLabel,
		IonItem,
		IonButton,
		IonCard,
		IonIcon,
		IonNote
	},
	data() {
		return {
			email: '',
			password: '',
			error: null,
			emailError: null,
			passwordError: null,
		}
	},
	setup() {
		return {
			lockClosedOutline,
			mailOutline
		}
	},
	methods: {
		login() {
			if(this.email == ''){
				// this.emailError = '';
			}
			this.axios
				.post('/auth/login', {
					email: this.email,
					password: this.password
				})
				.then((response) => {
					alert(response)
				})
				.catch((response) => {
					// alert(response)
					this.error = response;
					this.emailError = response;
				})
		}
	}
})
</script>

<style>
.text-center {
	text-align: center;
}
.center-vert {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>