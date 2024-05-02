<template>
    <div id="home-view">
        <animated-mouse-pointer-component />
        <div class="main-title-wrapper">
            <glitching-word-component value="Maroš" />
            <glitching-word-component value="Bednár" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnimatedMousePointerComponent from '../components/animated-mouse-pointer-component.vue'
import GlitchingWordComponent from '../components/glitching-word-component.vue'

export default defineComponent({
    name: 'HomeView',
    components: {
        GlitchingWordComponent: GlitchingWordComponent,
        AnimatedMousePointerComponent: AnimatedMousePointerComponent
    },
    mixins: [],
    props: {},
    emits: [],
    data: () => ({
        canvas: null as HTMLCanvasElement | null,
        canvasCtx: null as CanvasRenderingContext2D | null
    }),
    computed: {},
    watch: {},
    methods: {},
    mounted() {}
})
</script>

<style scoped lang="scss">
.main-title-wrapper {
    display: flex;
    position: absolute;
    margin: 0;
    padding: 0;
    color: #f9f1e9;
    text-align: center;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    user-select: none;
    font-family: system-ui;
    z-index: 100;
}

.demo-1 .main-title-wrapper {
    text-transform: uppercase;
    font-size: 4.2em;
    letter-spacing: 0.1em;
}

.main-title-wrapper .thin {
    font-weight: 200;
}

@media only screen and (max-width: 768px) {
    .demo-1 .main-title-wrapper {
        font-size: 3em;
    }
}
</style>
