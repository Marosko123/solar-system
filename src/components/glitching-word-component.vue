<script setup lang="ts"></script>

<template>
    <div class="glitching-header-component">
        <h1 :style="getStyle()">{{ value }}</h1>
    </div>
</template>

<script lang="ts">
import { KeyboardCharacters } from '../common/keyboard-characters'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'GlitchingWordComponent',
    components: {},
    mixins: [],
    emits: [],
    data: () => ({
        interval: null as any,
        iteration: 0 as number,
        element: null as HTMLHeadingElement | null
    }),
    props: {
        value: {
            type: String,
            required: true
        },
        staticSize: {
            type: Number,
            default: 0
        },
        speed: {
            type: Number,
            default: 50
        },
        isUppercase: {
            type: Boolean,
            default: false
        }
    },
    computed: {},
    watch: {},
    methods: {
        bind() {
            document.querySelectorAll('h1').forEach((element: HTMLHeadingElement) => {
                if (element.innerHTML === this.value) {
                    this.element = element
                }
            })

            if (this.element) {
                this.element.addEventListener('mouseover', this.glitch)
            }
        },
        glitch(): void {
            clearInterval(this.interval)
            this.interval = setInterval(() => this.changeLetter(), this.speed)
            this.iteration = 0
        },
        changeLetter(): void {
            if (!this.element) {
                return
            }

            this.element.innerText = this.element.innerText
                .split('')
                .map((_: any, index: number) => {
                    return index < this.iteration
                        ? this.value[index]
                        : KeyboardCharacters.letters[Math.floor(Math.random() * 26)]
                })
                .join('')

            if (this.iteration >= this.value.length) {
                clearInterval(this.interval)
            }

            this.iteration += 0.25
        },
        getStyle(): any {
            return {
                fontSize: this.staticSize ? `${this.staticSize}px` : '4vh',
                textTransform: this.isUppercase ? 'uppercase' : 'none'
            }
        }
    },
    mounted() {
        this.bind()
    }
})
</script>

<style scoped lang="scss">
h1 {
    font-family: 'Space Mono', monospace;
    font-size: 4vh;
    color: white;
    padding: 0rem 10px;
    border-radius: clamp(0.4rem, 0.75vw, 1rem);
    user-select: none;
    pointer-events: visible;
}

h1:hover {
    // background-color: rgba(0, 0, 0, 1);
    // color: rgb(255, 255, 255);
    // invert colors
    background-color: rgba(255, 255, 255, 1);
    color: rgb(0, 0, 0);
}
</style>
