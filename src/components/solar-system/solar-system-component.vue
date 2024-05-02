<template>
    <div class="solar-system-component">
        <canvas ref="canvas"></canvas>

        <div class="text-wrapper">
            <glitching-word-component v-if="isPaused" :isUppercase="true" :value="'Paused'" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Nullable } from '../../common/type-aliases'
import { useTweakPane } from '../../common/composables/use-tweak-pane'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
    AmbientLight,
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Mesh,
    MeshPhongMaterial,
    MeshStandardMaterial,
    PerspectiveCamera,
    PointLight,
    PointLightHelper,
    Points,
    PointsMaterial,
    Scene,
    SphereGeometry,
    TextureLoader,
    WebGLRenderer
} from 'three'
import GlitchingWordComponent from '../glitching-word-component.vue'

let starField = null as Nullable<Points>
let sun = null as Nullable<Mesh>
let mercury = null as Nullable<Mesh>
let venus = null as Nullable<Mesh>
let earth = null as Nullable<Mesh>
let moon = null as Nullable<Mesh>
let mars = null as Nullable<Mesh>
let jupiter = null as Nullable<Mesh>
let saturn = null as Nullable<Mesh>
let uranus = null as Nullable<Mesh>
let neptune = null as Nullable<Mesh>
let scene = new Scene()

export default defineComponent({
    name: 'SolarSystemComponent',
    components: { GlitchingWordComponent },
    mixins: [],
    emits: [],
    data: () => ({
        canvas: null as Nullable<HTMLCanvasElement>,
        renderer: null as Nullable<WebGLRenderer>,
        camera: new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
        fpsGraph: useTweakPane().fpsGraph,
        controls: null as Nullable<OrbitControls>,
        width: window.innerWidth as number,
        height: window.innerHeight as number,
        light: new PointLight(0xffffff, 80, 100, 1.2),
        // light: new AmbientLight(0xffffff, 0.5),
        lightHelper: null as Nullable<PointLightHelper>,
        isPaused: false
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
            window.addEventListener('keypress', this.keyDown)
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

            this.camera.position.z = 150
        },
        setRenderer(): void {
            if (!this.canvas) {
                return
            }

            this.renderer = new WebGLRenderer({
                canvas: this.canvas,
                antialias: true
            })
            this.renderer.setPixelRatio(window.devicePixelRatio)
        },
        setControls(): void {
            if (!this.renderer || !this.camera || !this.canvas) {
                return
            }

            this.controls = new OrbitControls(this.camera, this.canvas)

            this.controls.enableDamping = true
            this.controls.dampingFactor = 0.05
            this.controls.enablePan = true
            this.controls.enableZoom = true
            this.controls.autoRotate = false
            this.controls.autoRotateSpeed = 5
        },
        setLight(): void {
            this.light.position.set(0, 0, 0)
            this.lightHelper = new PointLightHelper(this.light, 0.5)
        },
        createMaterials(): void {
            this.createSpaceBackground()

            this.createSun()
            mercury = this.createPlanet('mercury', 2.5, { x: 20, y: 0, z: 0 })
            venus = this.createPlanet('venus', 2, { x: 40, y: 0, z: 0 })
            this.createEarth()
            this.createMoon()
            mars = this.createPlanet('mars', 1.5, { x: 80, y: 0, z: 0 })
            jupiter = this.createPlanet('jupiter', 3, { x: 100, y: 0, z: 0 })
            saturn = this.createPlanet('saturn', 4, { x: 120, y: 0, z: 0 })
            uranus = this.createPlanet('uranus', 4, { x: 140, y: 0, z: 0 })
            neptune = this.createPlanet('neptune', 4, { x: 160, y: 0, z: 0 })
        },
        createSpaceBackground(): void {
            const stars = new Array(0)
            for (let i = 0; i < 100000; i++) {
                stars.push(
                    Math.random() * 2000 - 1000,
                    Math.random() * 2000 - 1000,
                    Math.random() * 2000 - 1000
                )
            }

            let starsGeometry = new BufferGeometry()
            starsGeometry.setAttribute('position', new Float32BufferAttribute(stars, 3))
            let starsMaterial = new PointsMaterial({ color: 0x888888 })

            starField = new Points(starsGeometry, starsMaterial)
        },
        createSun(): void {
            const relativeUrl = '/textures/stars/'

            const sunGeometry = new SphereGeometry(6, 32, 32)
            const sunMaterial = new MeshStandardMaterial({
                emissive: 0xffd700,
                emissiveMap: new TextureLoader().load(relativeUrl + 'sun.jpg'),
                emissiveIntensity: 1,
                metalness: 1,
                roughness: 1
            })

            sun = new Mesh(sunGeometry, sunMaterial)

            sun.position.set(0, 0, 0)
        },
        createPlanet(
            planetName: string,
            radius: number,
            position: { x: number; y: number; z: number }
        ): any {
            const relativeUrl = `/textures/${planetName}/`

            const geometry = new SphereGeometry(radius, 32, 32)
            const material = new MeshPhongMaterial()

            material.map = new TextureLoader().load(relativeUrl + `${planetName}.jpg`)

            const planet = new Mesh(geometry, material)
            planet.position.set(position.x, position.y, position.z)

            return planet
        },
        createEarth(): void {
            const relativeUrl = '/textures/earth/'

            // EARTH
            const earthGeometry = new SphereGeometry(3, 32, 32)
            const earthMaterial = new MeshPhongMaterial()

            earthMaterial.map = new TextureLoader().load(relativeUrl + 'earth-map.jpg')
            earthMaterial.bumpMap = new TextureLoader().load(relativeUrl + 'bump-map.jpg')
            earthMaterial.specularMap = new TextureLoader().load(relativeUrl + 'specular-map.jpg')
            earthMaterial.specular = new Color('grey')

            earth = new Mesh(earthGeometry, earthMaterial)

            earth.position.set(60, 0, 0)

            // TODO: Add Clouds
            // https://riptutorial.com/three-js/example/28900/creating-a-model-earth#
        },
        createMoon(): void {
            const relativeUrl = '/textures/stars/'

            // MOON
            const moonGeometry = new SphereGeometry(0.3, 32, 32)
            const moonMaterial = new MeshPhongMaterial()

            moonMaterial.map = new TextureLoader().load(relativeUrl + 'moon.jpg')

            moon = new Mesh(moonGeometry, moonMaterial)

            moon.position.set(10, 0, 0)
        },
        addToScene(): void {
            // CAMERA, LIGHTS
            scene.add(this.camera)
            scene.add(this.light)
            // scene.add(this.light, this.lightHelper)

            // MATERIALS
            scene.add(starField!)
            scene.add(sun!)
            scene.add(mercury!)
            scene.add(venus!)
            scene.add(earth!)
            scene.add(moon!)
            scene.add(mars!)
            scene.add(jupiter!)
            scene.add(saturn!)
            scene.add(uranus!)
            scene.add(neptune!)
        },
        animate(): void {
            if (
                !this.renderer ||
                !this.controls ||
                !earth ||
                !mercury ||
                !sun ||
                !venus ||
                !mars ||
                !jupiter ||
                !saturn ||
                !uranus ||
                !neptune
            ) {
                return
            }

            if (!this.isPaused) {
                const rotationDegree = Date.now()
                sun.rotation.y += 0.001

                mercury.position.x = 20 * Math.cos(rotationDegree / 1500)
                mercury.position.z = 20 * Math.sin(rotationDegree / 1500)
                mercury.rotation.y += 0.005

                venus.position.x = 40 * Math.cos(rotationDegree / 3000)
                venus.position.z = 40 * Math.sin(rotationDegree / 3000)
                venus.rotation.y += 0.005

                earth.position.x = 60 * Math.cos(rotationDegree / 5000)
                earth.position.z = 60 * Math.sin(rotationDegree / 5000)
                earth.rotation.y += 0.005

                mars.position.x = 80 * Math.cos(rotationDegree / 6000)
                mars.position.z = 80 * Math.sin(rotationDegree / 6000)
                mars.rotation.y += 0.005

                jupiter.position.x = 100 * Math.cos(rotationDegree / 7000)
                jupiter.position.z = 100 * Math.sin(rotationDegree / 7000)
                jupiter.rotation.y += 0.005

                saturn.position.x = 120 * Math.cos(rotationDegree / 8000)
                saturn.position.z = 120 * Math.sin(rotationDegree / 8000)
                saturn.rotation.y += 0.005

                uranus.position.x = 140 * Math.cos(rotationDegree / 9000)
                uranus.position.z = 140 * Math.sin(rotationDegree / 9000)
                uranus.rotation.y += 0.005

                neptune.position.x = 160 * Math.cos(rotationDegree / 10000)
                neptune.position.z = 160 * Math.sin(rotationDegree / 10000)
                neptune.rotation.y += 0.005
            }

            this.controls.update()
            this.fpsGraph.begin()
            this.renderer.render(scene, this.camera)
            this.fpsGraph.end()

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
        keyDown(e: KeyboardEvent) {
            if (e.code === 'KeyP') {
                this.isPaused = !this.isPaused
            }
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
</style>
