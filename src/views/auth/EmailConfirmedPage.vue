<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="center-vert">
				<img :src="`${publicPath}assets/logo.svg`" class="logo" />
				<ion-card style="width: 90%; padding: 10px">
					<div class="text-center checkmark">
						<ion-icon :icon="checkmarkCircleOutline" size="extra-large"></ion-icon>
					</div>
					<p class="text-center">{{ $t('messages.email_confirmed') }}</p>
					<ion-button @click="() => $router.replace('/login')" ref="submitButton" expand="block" disabled>{{countDown}}</ion-button>
				</ion-card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonPage, IonInput, IonItem, IonButton, IonCard, IonNote, IonContent } from '@ionic/vue'
import { checkmarkCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'EmailConfirmedPage',
	components: {
		IonPage,
		IonButton,
		IonCard,
		IonContent
	},
	setup() {
		return {
			checkmarkCircleOutline
		}
	},
	data() {
		return {
			publicPath: process.env.BASE_URL,
			countDown: 5
		}
	},
	mounted() {
		this.countDownTimer();
        setTimeout(() => {
            this.$router.replace('/login');
        }, 4000);
	},
	methods: {
		countDownTimer() {
            let button: any = this.$refs.submitButton;
			if (this.countDown > 0) {
				setTimeout(() => {
					this.countDown -= 1;
                    button.$el.disabled = true;
                    button.$el.innerHTML = this.countDown;
					this.countDownTimer()
				}, 1000)
			}else{
                button.$el.innerHTML = this.$t('buttons.go_to_login');
                button.$el.disabled = false;
            }
		}
	}
})
</script>

<style>

.logo {
	max-width: 7rem;
	margin-bottom: 1rem;
	margin-top: -5rem;
}
.text-center {
	text-align: center;
}
.checkmark {
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--ion-color-success);
	font-size: 64px;
	margin: 0;
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
</style>