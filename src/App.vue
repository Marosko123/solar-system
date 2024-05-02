<script setup lang="ts">
import NavbarComponent from './components/navbar-component.vue'
</script>

<template>
    <div id="app">
        <!-- Navbar -->
        <NavbarComponent id="navbar" />

        <!-- Views -->
        <div class="text-center mt-14">
            <RouterView class="router-view bg-slate-300" />
        </div>
    </div>
</template>

<style lang="scss">
body {
    height: 100vh;
    width: 100vw;
    // background: radial-gradient(#0f0f0f, rgb(12, 9, 51));
    // background-image: linear-gradient(179deg, rgba(0, 0, 0, 1) 9.2%, rgba(127, 16, 16, 1) 103.9%);
    background-image: linear-gradient(to right, #434343 0%, black 100%);
    overflow: hidden;
}
</style>
