<template>
    <div class="gravity-cursor-component">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Nullable } from '../../common/type-aliases'
import { useTweakPane } from '../../common/composables/use-tweak-pane'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {
    Color,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    PointLightHelper,
    Scene,
    SphereGeometry,
    TextureLoader,
    WebGLRenderer
} from 'three'

class SphereObject {
    public sphere!: Mesh

    constructor(
        public initialPosition: { x: number; y: number; z?: number },
        public timeLeft = sphereGenerationTime
    ) {
        this.createSphere()
        this.startLifecycle()
    }

    private createSphere(): any {
        const geometry = new SphereGeometry(1, 32, 32)
        const material = new MeshStandardMaterial()

        material.color = new Color(0xffffff)
        material.metalness = 0.5
        material.roughness = 0.1
        material.normalMap = textureLoader.load('/textures/golf-ball/normal-map.png')
        material.bumpMap = textureLoader.load('/textures/golf-ball/bump-map.jpg')

        this.sphere = new Mesh(geometry, material)
        this.sphere.position.set(this.initialPosition.x, this.initialPosition.y, 0)

        scene.add(this.sphere)
    }

    private startLifecycle(): void {
        if (this.timeLeft <= 0) {
            scene.remove(this.sphere)
            spheres.splice(spheres.indexOf(this), 1)

            spheres.push(
                new SphereObject(
                    {
                        x: Math.random() * 5 - 5,
                        y: Math.random() * 5 - 5
                    },
                    5 * sphereGenerationTime
                )
            )
            return
        }

        // let scale = this.timeLeft / sphereGenerationTime
        let scale = 1

        if (scale > 1) {
            scale = 1
        }

        this.sphere.scale.x = scale
        this.sphere.scale.y = scale
        this.sphere.scale.z = scale

        this.sphere.rotation.x += 0.01
        this.sphere.rotation.y += 0.01
        this.sphere.rotation.z += 0.01

        this.timeLeft--

        requestAnimationFrame(this.startLifecycle.bind(this))
    }
}

const textureLoader = new TextureLoader()
let spheres = [] as Array<SphereObject>
let scene = new Scene()
const fpsGraph = useTweakPane().fpsGraph
const sphereGenerationTime = 1 * 60 // 60 frames = 1 second
let iteration = 0

const gui = new dat.GUI()
gui.close()

export default defineComponent({
    name: 'GravityCursorComponent',
    components: {},
    mixins: [],
    emits: [],
    data: () => ({
        canvas: null as Nullable<HTMLCanvasElement>,
        renderer: null as Nullable<WebGLRenderer>,
        camera: new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
        controls: null as Nullable<OrbitControls>,
        width: window.innerWidth as number,
        height: window.innerHeight as number,
        pointLight1: new PointLight(0xff0000, 500),
        pointLight2: new PointLight(0x008000, 500),
        pointLight3: new PointLight(0x0000ff, 500),
        lightHelper: null as Nullable<PointLightHelper>,
        isPaused: false,
        mousePosition: {
            x: 0,
            y: 0
        }
    }),
    computed: {},
    watch: {},
    methods: {
        bind(): void {
            this.addEventListeners()
            this.setupEnvironment()
            this.addToScene()

            this.onResize()
            this.animate()
        },
        addEventListeners(): void {
            window.addEventListener('resize', this.onResize)
            window.addEventListener('mousemove', this.onMouseMove)
            window.addEventListener('click', this.onMouseClick)
        },
        setupEnvironment(): void {
            this.setCanvas()
            this.setCamera()
            this.setRenderer()
            this.setControls()
            this.setLight()
            this.createMaterials()
        },
        setCanvas(): void {
            this.canvas = this.$refs.canvas as HTMLCanvasElement
        },
        setCamera(): void {
            if (!this.camera) {
                return
            }

            this.camera.position.z = 10
        },
        setRenderer(): void {
            if (!this.canvas) {
                return
            }

            this.renderer = new WebGLRenderer({
                canvas: this.canvas,
                antialias: true,
                alpha: true
            })
            this.renderer.setPixelRatio(window.devicePixelRatio)
        },
        setControls(): void {
            if (!this.renderer || !this.camera || !this.canvas) {
                return
            }

            this.controls = new OrbitControls(this.camera, this.canvas)

            this.controls.enableRotate = false
            this.controls.enableDamping = false
            this.controls.dampingFactor = 0.05
            this.controls.enablePan = false
            this.controls.enableZoom = false
            this.controls.autoRotate = false
            this.controls.autoRotateSpeed = 5
        },
        setLight(): void {
            this.pointLight1.position.set(-5, -5, 0)
            this.pointLight2.position.set(5, -5, 0)
            this.pointLight3.position.set(0, 5, 0)

            const light1 = gui.addFolder('Light 1')
            const light2 = gui.addFolder('Light 2')
            const light3 = gui.addFolder('Light 3')

            const light1Color = {
                color: 0xff0000
            }
            const light2Color = {
                color: 0xff0000
            }
            const light3Color = {
                color: 0xff0000
            }

            light1.add(this.pointLight1.position, 'x').min(-3).max(3).step(0.01)
            light1.add(this.pointLight1.position, 'y').min(-6).max(6).step(0.01)
            light1.add(this.pointLight1.position, 'z').min(-3).max(3).step(0.01)
            light1.add(this.pointLight1, 'intensity').min(0).max(10000).step(1)
            light1.addColor(light1Color, 'color').onChange(() => {
                this.pointLight1.color.set(light1Color.color)
            })

            light2.add(this.pointLight2.position, 'x').min(-3).max(3).step(0.01)
            light2.add(this.pointLight2.position, 'y').min(-6).max(6).step(0.01)
            light2.add(this.pointLight2.position, 'z').min(-3).max(3).step(0.01)
            light2.add(this.pointLight2, 'intensity').min(0).max(10000).step(1)
            light2.addColor(light2Color, 'color').onChange(() => {
                this.pointLight2.color.set(light2Color.color)
            })

            light3.add(this.pointLight3.position, 'x').min(-3).max(3).step(0.01)
            light3.add(this.pointLight3.position, 'y').min(-6).max(6).step(0.01)
            light3.add(this.pointLight3.position, 'z').min(-3).max(3).step(0.01)
            light3.add(this.pointLight3, 'intensity').min(0).max(10000).step(1)
            light3.addColor(light3Color, 'color').onChange(() => {
                this.pointLight3.color.set(light3Color.color)
            })
        },
        getMousePercentage(): { x: number; y: number } {
            return {
                x: this.mousePosition.x / this.width,
                y: this.mousePosition.y / this.height
            }
        },
        createMaterials(): void {
            for (let i = 0; i < 1; i++) {
                spheres.push(
                    new SphereObject(
                        {
                            x: Math.random() * 5 - 5,
                            y: Math.random() * 5 - 5
                        },
                        5 * sphereGenerationTime
                    )
                )
            }
        },
        addToScene(): void {
            // CAMERA, LIGHTS
            scene.add(this.camera)
            scene.add(this.pointLight1)
            scene.add(this.pointLight2)
            scene.add(this.pointLight3)

            // HELPERS
            scene.add(new PointLightHelper(this.pointLight1, 1))
            scene.add(new PointLightHelper(this.pointLight2, 1))
            scene.add(new PointLightHelper(this.pointLight3, 1))
        },
        animate(): void {
            iteration++

            for (let s of spheres) {
                // s.sphere.position.x = this.mousePosition.x - this.width / 2
                // s.sphere.position.y = this.mousePosition.y - this.height / 2
                s.sphere.position.x = (this.mousePosition.x / this.width) * 6 - 3
                s.sphere.position.y = (-this.mousePosition.y / this.height) * 6 + 3
            }

            this.controls!.update()
            fpsGraph.begin()
            this.renderer!.render(scene, this.camera)
            fpsGraph.end()

            requestAnimationFrame(this.animate)
        },
        onResize(): void {
            if (!this.renderer || !this.camera) {
                return
            }

            this.width = window.innerWidth
            this.height = window.innerHeight
            this.camera.aspect = this.width / this.height
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.width, this.height)
        },
        onMouseMove(event: any): void {
            const screenCenter = {
                x: Math.round(this.width / 2),
                y: Math.round(this.height / 2)
            }
            const mousePosition = {
                x: event.clientX,
                y: event.clientY
            }

            console.log('Mouse position: ', mousePosition.x, mousePosition.y)
            console.log('Screen center: ', this.width / 2, this.height / 2)
            console.log(
                'Mouse position - screen center: ',
                mousePosition.x - screenCenter.x,
                mousePosition.y - screenCenter.y
            )

            this.mousePosition = mousePosition
        },
        onMouseClick(): void {
            // spheres.push(new SphereObject(this.mousePosition))
        }
    },
    mounted() {
        this.bind()
    }
})
</script>

<style scoped lang="scss">
.text-wrapper {
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 48%;
}

.gravity-cursor-component {
    width: 100%;
    height: 100%;
    background-color: #2e2e2e;
}
</style>
