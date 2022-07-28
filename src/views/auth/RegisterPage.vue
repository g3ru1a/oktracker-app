<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="center-vert">
				<img :src="`${publicPath}assets/logo.svg`" class="logo"/>
				<ion-card style="width: 90%; padding: 10px">
					<div v-if="error != ''">
						<ion-item class="text-center text-small" color="danger">{{ error }}</ion-item>
					</div>
					<ion-item :class="usernameError != '' ? 'ion-invalid' : ''">
						<ion-label><ion-icon :icon="personCircleOutline"></ion-icon></ion-label>
						<ion-input v-model="username" type="text" :placeholder="$t('placeholders.username')" @keydown="preventSpaces()" @change="preventSpaces()"/>
						<ion-note slot="error">{{ usernameError }}</ion-note>
					</ion-item>
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
					<ion-item :class="passwordConfirmError != '' ? 'ion-invalid' : ''">
						<ion-label><ion-icon :icon="lockClosedOutline"></ion-icon></ion-label>
						<ion-input v-model="passwordConfirm" type="password" :placeholder="$t('placeholders.password_confirm')" />
						<ion-note slot="error">{{ passwordConfirmError }}</ion-note>
					</ion-item>
					<ion-button ref="submitButton" v-on:click="validate()" expand="block">{{ $t('buttons.register') }}</ion-button>
				</ion-card>
				<p class="link-items" @click="()=> $router.push('/login')">{{$t('messages.login_link')}}</p>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { IonPage, IonInput, IonLabel, IonItem, IonButton, IonCard, IonIcon, IonNote, IonContent } from '@ionic/vue'
import { lockClosedOutline, mailOutline, personCircleOutline } from 'ionicons/icons'
import { AxiosResponse } from 'axios';
import { useStore, MUTATIONS, AuthData } from '../../store';

const regex_email =
// eslint-disable-next-line
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validateEmail = (email: string) => {
	return String(email).toLowerCase().match(regex_email)
}

// eslint-disable-next-line
var regex_password = /^(?=.*[0-9])(?=.*[!.@#$%^&*])[a-zA-Z0-9!.@#$%^&*]{6,16}$/;

const validatePassword = (password: string) => {
	return String(password).match(regex_password);
}

export default defineComponent({
	name: 'RegisterPage',
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
			username: '',
			email: '',
			password: '',
			passwordConfirm: '',
			error: '',
			usernameError: '',
			emailError: '',
			passwordError: '',
			passwordConfirmError: '',
		}
	},
	setup() {
		const store = useStore();
		store.commit(MUTATIONS.CLEAR_AUTH_DATA);
		return {
			lockClosedOutline,
			mailOutline,
			personCircleOutline,
			store
		}
	},
	mounted(){
		let submitButton: any = this.$refs.submitButton;
	},
	methods: {
		validate() {
			this.setSubmitState(false);
			this.error = this.usernameError = this.emailError = this.passwordError = this.passwordConfirmError = '';

			let cancel = this.checkBlank();

			if(!validateEmail(this.email)){
				this.emailError = this.$t('errors.bad_format.email')
				cancel = true;
			}
			if(this.password.length < 8 || this.password.length > 30){
				this.passwordError = this.$t('errors.bad_format.password_length');
				cancel = true;
			}else if(!validatePassword(this.password)){
				this.passwordError = this.$t('errors.bad_format.password_content');
				cancel = true;
			}
			if(this.password != this.passwordConfirm){
				this.passwordConfirmError = this.$t('errors.bad_format.password_match');
				cancel = true;
			}
			if (cancel) {
				this.setSubmitState(true);
				return;
			}
			this.register();
		},
		register(){
			this.axios
				.post('/auth/register', {
					email: this.email,
					password: this.password,
					password_confirmation: this.passwordConfirm,
					name: this.username,
				})
				.then((response: AxiosResponse) => {
					this.$router.push('/verify/'+response.data.user.id);
				})
				.catch((error) => {
					let error_code: number = error.response.status;
					// this.error = error.response.status;

					if(error_code == 422){
						if(error.response.data.errors.email != undefined){
							this.emailError = this.$t('errors.email_taken');
						} 
						if(error.response.data.errors.name != undefined){
							this.usernameError = this.$t('errors.username_taken');
						} 
						if(error.response.data.errors.password != undefined){
							this.emailError = this.$t('errors.bad_format.password_match');
						}
					}
					this.setSubmitState(true);
				});
		},
		checkBlank(){
			let cancel = false;
			if(this.username == ''){
				this.usernameError = this.$t('errors.empty.username')
				cancel = true;
			}
			if (this.email == '') {
				this.emailError = this.$t('errors.empty.email')
				cancel = true;
			}
			if (this.password == '') {
				this.passwordError = this.$t('errors.empty.password')
				cancel = true;
			}
			if (this.passwordConfirm == '') {
				this.passwordConfirmError = this.$t('errors.empty.password_confirm')
				cancel = true;
			}
			return cancel;
		},
		preventSpaces(){
			this.username = this.username.replace(/ /g, '');
		},
		setSubmitState(enabled: boolean){
			let submitButton: any = this.$refs.submitButton;
			if(enabled){
				submitButton.$el.disabled = false;
				submitButton.$el.innerHTML = this.$t('buttons.register');
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