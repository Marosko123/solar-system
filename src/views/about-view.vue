<template>
    <div id="about-view">
        <!-- <h1 class="mb-4 leading-none tracking-tight lg:text-3xl">About</h1> -->

        <animated-mouse-pointer-component />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnimatedMousePointerComponent from '../components/animated-mouse-pointer-component.vue'

export default defineComponent({
    name: 'AboutView',
    components: { AnimatedMousePointerComponent: AnimatedMousePointerComponent },
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
