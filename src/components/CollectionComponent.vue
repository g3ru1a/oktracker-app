<template>
    <div class="box">
        <p>{{collectionData.name}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CollectionData } from '@/views/user/CollectionsPage.vue';

export default defineComponent({
	name: 'CollectionsComponent',
    props: {
        collectionData: {
            type: Object as PropType<CollectionData>,
            required: true,
        },
    },
	components: {
	},
})
</script>

<style scoped>

.box {
    margin: 1rem;
    padding: 1.5rem;
    border-style: solid;
    border-radius: 10px;
    border-width: 2px;
    border-color: var(--ion-color-primary);
    /* background-color: red; */
}

</style>