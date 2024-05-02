<template>
    <div id="solar-system-view">
        <solar-system-component />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SolarSystemComponent from '../components/solar-system/solar-system-component.vue'

export default defineComponent({
    name: 'SolarSystemView',
    components: { SolarSystemComponent },
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
