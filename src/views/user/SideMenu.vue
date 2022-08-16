<template>
	<ion-app>
		<ion-split-pane content-id="main-content">
			<ion-menu content-id="main-content" type="overlay">
				<ion-content>
					<ion-list id="user-blob">
						<img class="profile-picture" src="https://dev.oktracker.com/storage/profile/1/profile.jpg"
							alt="user_profile" />
						<!-- <img class="profile-picture" :src="store.state.authData?.profile_picture" alt="user_profile" /> -->
						<ion-list-header style="color: white">{{ store.state.authData?.name }}</ion-list-header>
						<ion-note style="color: lightgray">{{ store.state.authData?.email }}</ion-note>
					</ion-list>
					<ion-list class="menu-list">
						<ion-menu-toggle :auto-hide="false">
							<ion-item @click="selectedIndex = 0" router-direction="root" :router-link="'/user/home'"
								lines="none" :detail="false" class="hydrated"
								:class="{ selected: selectedIndex === 0 }">
								<ion-icon slot="start" :icon="homeOutline"></ion-icon>
								<ion-label>{{ $t('menu.home') }}</ion-label>
							</ion-item>
							<ion-item @click="selectedIndex = 1" router-direction="root"
								:router-link="'/user/collections'" lines="none" :detail="false" class="hydrated"
								:class="{ selected: selectedIndex === 1 }">
								<ion-icon slot="start" :icon="cubeOutline"></ion-icon>
								<ion-label>{{ $t('menu.collections') }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
					<ion-list class="menu-list">
						<ion-menu-toggle :auto-hide="false">
							<ion-item @click="selectedIndex = 2" router-direction="root" :router-link="'/user/social'"
								lines="none" :detail="false" class="hydrated"
								:class="{ selected: selectedIndex === 2 }">
								<ion-icon slot="start" :icon="cafeOutline"></ion-icon>
								<ion-label>{{ $t('menu.social') }}</ion-label>
							</ion-item>
							<ion-item @click="selectedIndex = 3" router-direction="root" :router-link="'/user/account'"
								lines="none" :detail="false" class="hydrated"
								:class="{ selected: selectedIndex === 3 }">
								<ion-icon slot="start" :icon="personCircleOutline"></ion-icon>
								<ion-label>{{ $t('menu.account') }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
					<ion-list class="menu-list">
						<ion-menu-toggle :auto-hide="false">
							<ion-item @click="selectedIndex = 4" router-direction="root" :router-link="'/user/vendors'"
								lines="none" :detail="false" class="hydrated"
								:class="{ selected: selectedIndex === 4 }">
								<ion-icon slot="start" :icon="bagHandleOutline"></ion-icon>
								<ion-label>{{ $t('menu.vendors') }}</ion-label>
							</ion-item>
							<ion-item @click="selectedIndex = 5" router-direction="root" :router-link="'/user/settings'"
								lines="none" :detail="false" class="hydrated"
								:class="{ selected: selectedIndex === 5 }">
								<ion-icon slot="start" :icon="settingsOutline"></ion-icon>
								<ion-label>{{ $t('menu.settings') }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
					<ion-list class="menu-list">
						<ion-menu-toggle :auto-hide="false">
							<ion-item router-direction="root" :router-link="'/auth/logout'" lines="none" :detail="false"
								class="hydrated">
								<ion-icon slot="start" :icon="logOutOutline"></ion-icon>
								<ion-label>{{ $t('menu.logout') }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
					<ion-list class="menu-list">
						<ion-menu-toggle :auto-hide="false">
							<ion-item router-direction="root" :router-link="'/discord'" lines="none" :detail="false"
								class="hydrated">
								<ion-icon slot="start" :icon="logoDiscord"></ion-icon>
								<ion-label>{{ $t('menu.discord') }}</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>

					<ion-list class="menu-list">
						<ion-item lines="none" :detail="false" class="hydrated">
							<ion-icon slot="start" :icon="moonOutline"></ion-icon>
							<ion-label>{{ $t('menu.theme') }}</ion-label>
							<ion-toggle v-on:click="toggleDarkTheme()" ref="themeToggle"></ion-toggle>
						</ion-item>
					</ion-list>
				</ion-content>
			</ion-menu>
			<ion-router-outlet id="main-content"></ion-router-outlet>
		</ion-split-pane>
	</ion-app>
</template>

<script lang="ts">
import { IonToggle, IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { moonOutline, sunnyOutline, homeOutline, cubeOutline, cafeOutline, personCircleOutline, settingsOutline, bagHandleOutline, logOutOutline, logoDiscord } from 'ionicons/icons';
import { MUTATIONS, store } from '@/store';

export default defineComponent({
	name: 'App',
	components: {
		IonApp,
		IonContent,
		IonIcon,
		IonItem,
		IonLabel,
		IonList,
		IonListHeader,
		IonMenu,
		IonMenuToggle,
		IonNote,
		IonRouterOutlet,
		IonSplitPane,
		IonToggle,
	},
	setup() {
		const selectedIndex = ref(0);

		return {
			selectedIndex,
			homeOutline,
			cubeOutline, moonOutline, sunnyOutline,
			cafeOutline, personCircleOutline, settingsOutline, bagHandleOutline, logOutOutline, logoDiscord,
			store
		}
	},
	mounted() {
		let toggle: any = this.$refs.themeToggle;
		if(this.store.state.dark_theme == true){
			toggle.$el.checked = true;
			document.body.classList.add('dark');
		}
	},
	methods: {
		toggleDarkTheme() {
			let toggle: any = this.$refs.themeToggle;
			console.log(toggle.$el.checked);
			document.body.classList.toggle('dark', !toggle.$el.checked);
			this.store.commit(MUTATIONS.TOGGLE_THEME);
		},
	}
});
</script>

<style scoped>
.profile-picture {
	border-radius: 100rem;
	max-width: 5rem;
	max-height: 5rem;
	min-width: 5rem;
	min-height: 5rem;
	object-fit: cover;
}

ion-menu ion-content {
	--background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
	--padding-start: 8px;
	--padding-end: 8px;
	--padding-top: 20px;
	--padding-bottom: 20px;
}

ion-menu.md ion-list {
	padding: 20px 0;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
	padding-left: 10px;
}

ion-menu.md ion-list.menu-list {
	border-top: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-list#user-blob {
	background-color: var(--ion-color-primary-tint);
	/* For browsers that do not support gradients */
	background-image: linear-gradient(to bottom right, var(--ion-color-primary), var(--ion-color-primary-shade));
	padding-left: 2rem;
	margin-left: -1rem;
	margin-right: -1rem;
	margin-top: -2rem;
	padding-top: 2rem;
}

ion-menu.md ion-list#user-blob ion-list-header {
	font-size: 22px;
	font-weight: 600;
	min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
	font-size: 16px;

	margin-bottom: 18px;

	color: #757575;

	min-height: 26px;
}

ion-menu.md ion-item {
	--padding-start: 10px;
	--padding-end: 10px;
	border-radius: 4px;
}

ion-menu.md ion-item.selected {
	--background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
	color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
	color: #616e7e;
}

ion-menu.md ion-item ion-label {
	font-weight: 500;
}

ion-menu.ios ion-content {
	--padding-bottom: 20px;
}

ion-menu.ios ion-list {
	padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
	line-height: 24px;
	margin-bottom: 20px;
}

ion-menu.ios ion-item {
	--padding-start: 16px;
	--padding-end: 16px;
	--min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
	color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
	font-size: 24px;
	color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
	margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
	padding-left: 16px;
	padding-right: 16px;
}

ion-menu.ios ion-note {
	margin-bottom: 8px;
}

ion-note {
	display: inline-block;
	font-size: 16px;

	color: var(--ion-color-medium-shade);
}

ion-item.selected {
	--color: var(--ion-color-primary);
}
</style>
