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
					<ion-item :class="passwordError != '' ? 'ion-invalid' : ''">
						<ion-label><ion-icon :icon="lockClosedOutline"></ion-icon></ion-label>
						<ion-input v-model="password" type="password" :placeholder="$t('placeholders.password')" />
						<ion-note slot="error">{{ passwordError }}</ion-note>
					</ion-item>
					<ion-button ref="submitButton" v-on:click="login()" expand="block">{{ $t('buttons.login') }}</ion-button>
					<div class="links">
						<span class="link-items" @click="()=> $router.push('/forgot-password')">{{$t('messages.forgot_password_link')}}</span>
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
	name: 'LoginPage',
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
			password: '',
			error: '',
			emailError: '',
			passwordError: ''
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
		login() {
			this.setSubmitState(false);
			this.error = this.emailError = this.passwordError = '';
			let cancel = false;
			if (this.email == '') {
				this.emailError = this.$t('errors.empty.email');
				cancel = true;
			} else if(!validateEmail(this.email)){
				this.emailError = this.$t('errors.bad_format.email');
				cancel = true;
			}
			
			if (this.password == '') {
				this.passwordError = this.$t('errors.empty.password');
				cancel = true;
			}else if(this.password.length < 8 || this.password.length > 30){
				this.passwordError = this.$t('errors.bad_format.password_length');
				cancel = true;
			}

			if (cancel){
				this.setSubmitState(true);
				return;
			}
			this.axios
				.post('/auth/login', {
					email: this.email,
					password: this.password
				})
				.then((response: AxiosResponse) => {
					this.storeUserData(response);
				})
				.catch((error) => {
					let error_code: number = error.response.status;
					// this.error = error.response.status;

					if(error_code == 401){
						this.error = this.$t('errors.bad_credentials');
					}
					this.setSubmitState(true);
				});
		},
		storeUserData(response: AxiosResponse){
			console.log(response);
			let r_data = response.data;
			let data: AuthData = {
				id: r_data.user.id,
				name: r_data.user.name,
				email: r_data.user.email,
				profile_picture: r_data.user.profile_photo_url,
				role_id: r_data.role_id,
				token: r_data.token
			};
			this.store.commit(MUTATIONS.SET_AUTH_DATA, data);
			this.$router.replace('/');
		},
		setSubmitState(enabled: boolean){
			let submitButton: any = this.$refs.submitButton;
			if(enabled){
				submitButton.$el.disabled = false;
				submitButton.$el.innerHTML = this.$t('buttons.login');
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