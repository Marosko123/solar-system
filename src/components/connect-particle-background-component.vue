<script setup lang="ts"></script>

<template>
    <div id="large-header" class="large-header">
        <canvas id="demo-canvas"></canvas>
    </div>
</template>

<script lang="ts">
import { Circle } from '../common/data-types/circle'
import { Point } from '../common/data-types/point'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ConnectParticleBackgroundComponent',
    components: {},
    mixins: [],
    emits: [],
    data: () => ({
        pointsCount: 100 as number,
        canvas: null as HTMLCanvasElement | null,
        ctx: null as CanvasRenderingContext2D | null,
        width: 0,
        height: 0,
        largeHeader: null as HTMLElement | null,
        points: [] as Array<Point>,
        target: null as Point | null,
        animateHeader: true as boolean,
        iteration: 0 as number
    }),
    computed: {},
    watch: {},
    methods: {
        bind(): void {
            this.initHeader()
            this.initAnimation()
            this.addListeners()
        },
        initHeader(): void {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.target = new Point(this.width / 2, this.height / 2)

            this.largeHeader = document.getElementById('large-header')
            this.largeHeader!.style.height = this.height + 'px'

            this.canvas = document.getElementById('demo-canvas') as HTMLCanvasElement
            this.canvas.width = this.width
            this.canvas.height = this.height
            this.ctx = this.canvas.getContext('2d')

            const screenCenter = new Point(this.width / 2, this.height / 2)

            // create points
            this.points = []

            for (let i = 0; i < this.pointsCount; i++) {
                const x = screenCenter.x + Math.random() * this.width - this.width / 2
                const y = screenCenter.y + Math.random() * this.height - this.height / 2
                const point = new Point(x, y, x, y)

                this.points.push(point)
            }

            this.getClosestPoints()

            // assign a circle to each point
            for (let point of this.points) {
                point.circle = new Circle(point, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)')
            }
        },
        initAnimation(): void {
            this.animate()
        },
        async animate() {
            if (this.animateHeader && this.target && this.points && this.ctx) {
                this.ctx!.clearRect(0, 0, this.width, this.height)

                for (let point of this.points) {
                    if (!point.circle) {
                        continue
                    }

                    // detect points in range
                    const distance = this.getDistance(this.target, point)

                    if (distance < 2000) {
                        point.active = 0.5
                        point.circle.active = 0.7
                    } else if (distance < 10000) {
                        point.active = 0.3
                        point.circle.active = 0.5
                    } else if (distance < 20000) {
                        point.active = 0.22
                        point.circle.active = 0.21
                    } else {
                        point.active = 0
                        point.circle.active = 0
                    }

                    this.drawLines(point)

                    point.circle.draw(this.ctx)
                }
            }

            this.movePoints()

            if (this.iteration % 10 == 0) {
                this.iteration = 0
                this.getClosestPoints()
            }

            this.iteration++
            requestAnimationFrame(this.animate)
        },
        getClosestPoints() {
            // for each point find the 5 closest points
            for (let point1 of this.points) {
                let closest = []

                for (let point2 of this.points) {
                    if (point1 == point2) {
                        continue
                    }

                    let placed = false

                    for (let k = 0; k < 5; k++) {
                        if (!placed && !closest[k]) {
                            closest[k] = point2
                            placed = true
                            break
                        }
                    }

                    for (let k = 0; k < 5; k++) {
                        if (
                            !placed &&
                            this.getDistance(point1, point2) < this.getDistance(point1, closest[k])
                        ) {
                            closest[k] = point2
                            placed = true
                            break
                        }
                    }
                }
                point1.closest = closest
            }
        },
        movePoints(): void {
            for (let point of this.points) {
                if (point.x + point.directionX > this.width || point.x + point.directionX < 0) {
                    point.directionX = -point.directionX
                }
                if (point.y + point.directionY > this.height || point.y + point.directionY < 0) {
                    point.directionY = -point.directionY
                }

                point.x += point.directionX
                point.y += point.directionY
            }
        },
        addListeners(): void {
            if (!('ontouchstart' in window)) {
                window.addEventListener('mousemove', this.mouseMove)
            }
            window.addEventListener('scroll', this.scrollCheck)
            window.addEventListener('resize', this.resize)
        },
        mouseMove(e: MouseEvent): void {
            if (!this.target) {
                return
            }

            if (e.pageX || e.pageY) {
                this.target.x = e.pageX
                this.target.y = e.pageY
            } else if (e.clientX || e.clientY) {
                this.target.x =
                    e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
                this.target.y =
                    e.clientY + document.body.scrollTop + document.documentElement.scrollTop
            }
        },
        scrollCheck(): void {
            this.animateHeader = document.body.scrollTop <= this.height
        },
        resize(): void {
            this.initHeader()
        },
        // Canvas manipulation
        drawLines(p: Point) {
            if (!p.active || !this.ctx) {
                return
            }

            for (let i in p.closest) {
                this.ctx.beginPath()
                this.ctx.moveTo(p.x, p.y)
                this.ctx.lineTo(p.closest[i].x, p.closest[i].y)
                this.ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')'
                this.ctx.stroke()
            }
        },
        getDistance(p1: Point, p2: Point) {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
        }
    },
    mounted() {
        this.bind()
    }
})
</script>

<style scoped lang="scss">
.large-header {
    position: relative;
    width: 100%;
    // background: #333;
    overflow: hidden;
    background-size: cover;
    background-position: center center;
    z-index: 1;
}

#large-header {
    // background-image: url('https://www.marcoguglie.it/Codepen/AnimatedHeaderBg/demo-1/img/demo-1-bg.jpg');
    // background-image: url('https://r4.wallpaperflare.com/wallpaper/485/471/623/gradient-dark-background-wallpaper-c9b07bb7349de287293c5fb665815dfe.jpg');
    position: absolute;
    top: 0;
    z-index: 0;
}
</style>
