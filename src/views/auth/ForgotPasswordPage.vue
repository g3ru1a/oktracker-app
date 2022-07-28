<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="center-vert">
				<img :src="`${publicPath}assets/logo.svg`" class="logo"/>
				<ion-card style="width: 90%; padding: 10px">
					<div v-if="error != ''">
						<ion-item class="text-center text-small" color="danger">{{ error }}</ion-item>
					</div>
					<ion-item :class="emailError != '' ? 'ion-invalid' : ''">
						<ion-label><ion-icon :icon="mailOutline"></ion-icon></ion-label>
						<ion-input v-model="email" type="email" :placeholder="$t('placeholders.email_address')" />
						<ion-note slot="error">{{ emailError }}</ion-note>
					</ion-item>
					<ion-button ref="submitButton" v-on:click="forgot()" expand="block">{{ $t('buttons.request_password_reset') }}</ion-button>
					<div class="links">
						<span class="link-items" @click="()=> $router.push('/login')">{{$t('messages.login_link')}}</span>
					</div>
				</ion-card>
				<p>{{$t('messages.register_link_1')}} <span class="link-items" @click="()=> $router.push('/register')">{{$t('messages.register_link_2')}}</span></p>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonInput, IonLabel, IonItem, IonButton, IonCard, IonIcon, IonNote, IonContent } from '@ionic/vue'
import { lockClosedOutline, mailOutline } from 'ionicons/icons'
import { AxiosResponse } from 'axios';
import { useStore, MUTATIONS, AuthData } from '../../store';

const regex_email =
// eslint-disable-next-line
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validateEmail = (email: string) => {
	return String(email).toLowerCase().match(regex_email)
}

export default defineComponent({
	name: 'ForgotPasswordPage',
	components: {
		IonPage,
		IonInput,
		IonLabel,
		IonItem,
		IonButton,
		IonCard,
		IonIcon,
		IonNote,
		IonContent
	},
	data() {
		return {
			publicPath: process.env.BASE_URL,
			email: '',
			error: '',
			emailError: '',
		}
	},
	setup() {
		const store = useStore();
		store.commit(MUTATIONS.CLEAR_AUTH_DATA);
		return {
			lockClosedOutline,
			mailOutline,
			store
		}
	},
	methods: {
		forgot() {
			this.setSubmitState(false);
			this.error = this.emailError = '';
			let cancel = false;
			if (this.email == '') {
				this.emailError = this.$t('errors.empty.email');
				cancel = true;
			} else if(!validateEmail(this.email)){
				this.emailError = this.$t('errors.bad_format.email');
				cancel = true;
			}

			if (cancel){
				this.setSubmitState(true);
				return;
			}
			this.axios
				.post('/auth/password/forgot', {
					email: this.email,
				})
				.then((response: AxiosResponse) => {
					this.$router.push({name:'reset_password', params: {email: this.email}});
				})
				.catch((error) => {
					let error_code: number = error.response.status;

					if(error_code == 422){
						this.emailError = this.$t('errors.email_not_found');
					}
					this.setSubmitState(true);
				});
		},
		setSubmitState(enabled: boolean){
			let submitButton: any = this.$refs.submitButton;
			if(enabled){
				submitButton.$el.disabled = false;
				submitButton.$el.innerHTML = this.$t('buttons.request_password_reset');
			}else{
				submitButton.$el.disabled = true;
				submitButton.$el.innerHTML = this.$t('buttons.loading');
			}
		}
	}
})
</script>

<style>
.link-items {
	color: var(--ion-color-primary-tint);
}
.links {
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.logo {
	max-width: 7rem;
	margin-bottom: 1rem;
	margin-top: -5rem;
}
.text-center {
	text-align: center;
}
.center-vert {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

@media (prefers-color-scheme: dark) {
	.logo {
		filter: brightness(0) invert(1);
	}
}
</style>