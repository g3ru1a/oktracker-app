<template>
	<ion-page>
		<ion-content :fullscreen="true">
            <div v-if="!email" class="center-vert">
                <ion-item color="danger"><p>{{$t('errors.something_went_wrong')}}</p></ion-item>
				<span style="margin-top: 1rem;" class="link-items" @click="()=> $router.replace('/login')">{{$t('buttons.go_to_login')}}</span>
            </div>
			<div v-if="email" class="center-vert">
				<img :src="`${publicPath}assets/logo.svg`" class="logo"/>
				<ion-card style="width: 90%; padding: 10px">
                    <p style="text-align: center">{{$t('messages.password_reset_check_email')}}</p>
					<div v-if="error != ''">
						<ion-item class="text-center text-small" color="danger">{{ error }}</ion-item>
					</div>
                    <ion-item class="code-box" :class="codeError != '' ? 'ion-invalid' : ''">
						<ion-input
							class="code-field"
							id="d1"
							v-model="digit1"
							type="number"
							:placeholder="$t('placeholders.verification_code')"
                            @keyup="() => {digit1 = validateDigit(digit1);nextField('d2')}"
							@keyup.delete="nextField('d1')"
						/>
						<ion-input
							class="code-field"
							id="d2"
							v-model="digit2"
							type="number"
							:placeholder="$t('placeholders.verification_code')"
                            @keyup="() => {digit2 = validateDigit(digit2);nextField('d3')}"
							@keyup.delete="nextField('d1')"
						/>
						<ion-input
							class="code-field"
							id="d3"
							v-model="digit3"
							type="number"
							:placeholder="$t('placeholders.verification_code')"
                            @keyup="() => {digit3 = validateDigit(digit3);nextField('d4')}"
							@keyup.delete="nextField('d2')"
						/>
						<ion-input
							class="code-field"
							id="d4"
							v-model="digit4"
							type="number"
							:placeholder="$t('placeholders.verification_code')"
                            @keyup="() => {digit4 = validateDigit(digit4);nextField('d5')}"
							@keyup.delete="nextField('d3')"
						/>
						<ion-input
							class="code-field"
							id="d5"
							v-model="digit5"
							type="number"
							:placeholder="$t('placeholders.verification_code')"
                            @keyup="() => {digit5 = validateDigit(digit5);nextField('d6')}"
							@keyup.delete="nextField('d4')"
						/>
						<ion-input
							class="code-field"
							id="d6"
							v-model="digit6"
							type="number"
							:placeholder="$t('placeholders.verification_code')"
                            @keyup="() => {digit6 = validateDigit(digit6);nextField('d6')}"
							@keyup.delete="nextField('d5')"
						/>
						<ion-note slot="error">{{ codeError }}</ion-note>
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
					<ion-button ref="submitButton" v-on:click="forgot()" expand="block">{{ $t('buttons.reset_password') }}</ion-button>
				</ion-card>
				<span class="link-items" @click="()=> $router.replace('/login')">{{$t('buttons.go_to_login')}}</span>
            </div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonInput, IonLabel, IonItem, IonButton, IonCard, IonIcon, IonNote, IonContent } from '@ionic/vue'
import { lockClosedOutline, mailOutline } from 'ionicons/icons'
import { AxiosResponse } from 'axios';

// eslint-disable-next-line
var regex_password = /^(?=.*[0-9])(?=.*[!.@#$%^&*])[a-zA-Z0-9!.@#$%^&*]{6,16}$/;

const validatePassword = (password: string) => {
	return String(password).match(regex_password);
}

export default defineComponent({
	name: 'ResetPasswordPage',
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
    props: {
        email: {
            type: String,
            required: true,
        }
    },
	data() {
		return {
			publicPath: process.env.BASE_URL,
			error: '',
            password: '',
            passwordConfirm: '',
            passwordError: '',
            passwordConfirmError: '',
			codeError: '',
			digit1: '',
			digit2: '',
			digit3: '',
			digit4: '',
			digit5: '',
			digit6: '',
		}
	},
	setup() {
		return {
			lockClosedOutline,
			mailOutline,
		}
	},
	methods: {
		forgot() {
			this.setSubmitState(false);
            
			this.error = this.passwordError = this.passwordConfirmError = this.codeError = '';
			let cancel = this.checkBlank();

			if (cancel){
				this.setSubmitState(true);
				return;
			}
			let code = this.digit1 + this.digit2 + this.digit3 + this.digit4 + this.digit5 + this.digit6;
			this.axios
				.post('/auth/password/reset', {
                    email: this.$props.email,
                    token: code,
                    password: this.password,
                    password_confirmation: this.passwordConfirm,
				})
				.then((response: AxiosResponse) => {
					this.$router.replace({name: 'reset_password_success'});
				})
				.catch((error) => {
					let error_code: number = error.response.status;

					if(error_code == 422){
                        if(error.response.data.message != undefined){
                            if(error.response.data.message == "Token doesn't match"){
                                this.codeError = this.$t('errors.wrong_code');
                            }
                        }
                        if(error.response.data.errors?.email != undefined){
                            this.error = this.$t('errors.something_went_wrong');
                        }
					}
					this.setSubmitState(true);
				});
		},
		setSubmitState(enabled: boolean){
			let submitButton: any = this.$refs.submitButton;
			if(enabled){
				submitButton.$el.disabled = false;
				submitButton.$el.innerHTML = this.$t('buttons.reset_password');
			}else{
				submitButton.$el.disabled = true;
				submitButton.$el.innerHTML = this.$t('buttons.loading');
			}
		},
		checkBlank(){
			let cancel = false;
            if(this.digit1 == '' || this.digit2 == '' || this.digit3 == '' || this.digit4 == '' || this.digit5 == '' || this.digit6 == ''){
                this.codeError = this.$t('errors.empty.code_digit');
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
			return cancel;
		},
		nextField(field: string) {
			let element: any = document.getElementById(field)
			this.$nextTick(() => element?.setFocus())
		},
        validateDigit(digit: any){
            digit = digit.replace(/[^0-9]+/g, '');
            if(digit.length > 1) digit = digit.charAt(0);
            return digit;
        },
	}
})
</script>

<style>
.code-box {
	padding: 0.5rem;
}

.code-field {
	margin: 0.2rem;
	text-align: center;
	background-color: var(--ion-color-light-shade);
	border-radius: 0.3rem;
}
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
    .code-field {
        background-color: var(--ion-color-step-200);
    }
}
</style>