<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="center-vert">
				<img :src="`${publicPath}assets/logo.svg`" class="logo" />
				<ion-card style="width: 90%; padding: 10px">
                    <p style="text-align: center">{{$t('messages.check_email')}}</p>
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
					<ion-button ref="submitButton" v-on:click="verify()" expand="block">{{ $t('buttons.verify') }}</ion-button>
				</ion-card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonInput, IonItem, IonButton, IonCard, IonNote, IonContent } from '@ionic/vue'
import { AxiosResponse } from 'axios'
import { useStore, MUTATIONS, AuthData } from '../../store'

export default defineComponent({
	name: 'ConfirmEmailPage',
	components: {
		IonPage,
		IonInput,
		IonItem,
		IonButton,
		IonCard,
		IonNote,
		IonContent
	},
	data() {
		return {
			publicPath: process.env.BASE_URL,
			digit1: '',
			digit2: '',
			digit3: '',
			digit4: '',
			digit5: '',
			digit6: '',
			error: '',
			codeError: ''
		}
	},
	setup() {
		const store = useStore()
		store.commit(MUTATIONS.CLEAR_AUTH_DATA)
		return {
			store
		}
	},
	methods: {
		verify() {
            this.setSubmitState(false);
            this.codeError = '';
            if(this.hasBlank()) {
                this.setSubmitState(true);
                return;
            }
			let code = this.digit1 + this.digit2 + this.digit3 + this.digit4 + this.digit5 + this.digit6;
            
			this.axios
				.post(`/auth/verify/${this.$route.params.user_id}/${code}`)
				.then((response: AxiosResponse) => {
					this.$router.push('/verified');
				})
				.catch((error) => {
					if(error.response.status == 422){
                        this.codeError = this.$t('errors.wrong_code');
                        this.digit1 = this.digit2 = this.digit3 = this.digit4 = this.digit5 = this.digit6 = '';
                    }
                    this.setSubmitState(true);
				})
		},
        hasBlank(){
            if(this.digit1 == '' || this.digit2 == '' || this.digit3 == '' || this.digit4 == '' || this.digit5 == '' || this.digit6 == ''){
                this.codeError = this.$t('errors.empty.code_digit');
                return true;
            }
            return false;
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
		setSubmitState(enabled: boolean){
			let submitButton: any = this.$refs.submitButton;
			if(enabled){
				submitButton.$el.disabled = false;
				submitButton.$el.innerHTML = this.$t('buttons.verify');
			}else{
				submitButton.$el.disabled = true;
				submitButton.$el.innerHTML = this.$t('buttons.loading');
			}
		}
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

body.dark .logo {
	filter: brightness(0) invert(1);
}
body.dark .code-field {
	background-color: var(--ion-color-step-200);
}
</style>