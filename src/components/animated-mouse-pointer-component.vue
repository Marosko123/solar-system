<template>
    <div class="animated-mouse-pointer-component">
        <div id="blob"></div>
        <div id="blur"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Nullable } from '../common/type-aliases'

export default defineComponent({
    name: 'AnimatedMousePointerComponent',
    components: {},
    mixins: [],
    emits: [],
    data: () => ({
        blob: null as Nullable<HTMLDivElement>
    }),
    computed: {},
    watch: {},
    methods: {
        bind(): void {
            this.blob = document.getElementById('blob') as HTMLDivElement

            this.addEventListeners()
        },
        addEventListeners(): void {
            document.addEventListener('mousemove', this.onMouseMove)
        },
        onMouseMove(event: MouseEvent): void {
            if (!this.blob) {
                return
            }

            const { clientX, clientY } = event

            this.blob.animate(
                {
                    left: `${clientX}px`,
                    top: `${clientY}px`
                },
                {
                    duration: 3000,
                    fill: 'forwards'
                }
            )
        }
    },
    mounted() {
        this.bind()
    }
})
</script>

<style scoped lang="scss">
.animated-mouse-pointer-component {
    z-index: 200;
}

@keyframes rotate {
    from {
        rotate: 0deg;
    }

    50% {
        scale: 1 1.5;
    }

    to {
        rotate: 360deg;
    }
}

#blob {
    background-color: cyan;
    height: 250px;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: linear-gradient(to right, aquamarine, mediumpurple);
    animation: rotate 15s infinite;
    filter: blur(100px);
}

#blur {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
    backdrop-filter: blur(50px);
}
</style>
