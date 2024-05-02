<template>
    <div id="connect-particle-background-view">
        <connect-particle-background-component />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ConnectParticleBackgroundComponent from '../components/connect-particle-background-component.vue'

export default defineComponent({
    name: 'ConnectParticleBackgroundView',
    components: {
        ConnectParticleBackgroundComponent: ConnectParticleBackgroundComponent
    },
    mixins: [],
    props: {},
    emits: [],
    data: () => ({
        isUserSignedIn: false
    }),
    computed: {},
    watch: {},
    methods: {}
})
</script>

<style scoped lang="scss"></style>
