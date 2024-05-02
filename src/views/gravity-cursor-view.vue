<template>
    <div id="gravity-cursor-view">
        <gravity-cursor-component />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GravityCursorComponent from '../components/gravity-cursor/gravity-cursor-component.vue'

export default defineComponent({
    name: 'GravityCursorView',
    components: { GravityCursorComponent },
    mixins: [],
    props: {},
    emits: [],
    data: () => ({}),
    computed: {},
    watch: {},
    methods: {},
    mounted() {}
})
</script>
