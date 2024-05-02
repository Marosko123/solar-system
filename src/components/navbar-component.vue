<template>
    <div class="navbar-component">
        <nav class="flex">
            <router-link to="/home">
                <glitching-word-component value="Home" :staticSize="30" />
            </router-link>
            <!-- <router-link to="/about">
                <glitching-word-component value="About" :staticSize="30" />
            </router-link>
            <router-link to="/pointer">
                <glitching-word-component value="Pointer" :staticSize="30" />
            </router-link> -->
            <router-link to="/particles">
                <glitching-word-component value="Particles" :staticSize="30" />
            </router-link>
            <router-link to="/solar-system">
                <glitching-word-component value="Solar System" :staticSize="30" />
            </router-link>
            <router-link to="/gravity-cursor">
                <glitching-word-component value="Gravity Cursor" :staticSize="30" />
            </router-link>
        </nav>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlitchingWordComponent from './glitching-word-component.vue'

export default defineComponent({
    name: 'NavbarComponent',
    components: { GlitchingWordComponent },
    mixins: [],
    props: {
        userName: {
            type: String,
            default: 'Monty'
        }
    },
    emits: [],
    data: () => ({
        isUserSignedIn: false
    }),
    computed: {},
    watch: {},
    methods: {}
})
</script>

<style lang="scss">
.navbar-component {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100vw;
    pointer-events: none;
}

.flex {
    place-content: center;

    a {
        padding: 0 0.8rem;
    }
}
</style>
