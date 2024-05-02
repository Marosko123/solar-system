<template>
    <div id="animated-mouse-pointer-view">
        <animated-mouse-pointer-component />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnimatedMousePointerComponent from '../components/animated-mouse-pointer-component.vue'

export default defineComponent({
    name: 'AnimatedMousePointerView',
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
