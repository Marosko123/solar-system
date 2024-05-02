import type { Circle } from './circle'

export class Point {
    x: number
    y: number
    originX: number
    originY: number
    closest: Array<Point>
    circle: Circle | null = null
    active: number = 0
    directionX = Math.random() * 2 - 1
    directionY = Math.random() * 2 - 1

    constructor(
        x: number,
        y: number,
        originX: number = 0,
        originY: number = 0,
        closest: Array<Point> = []
    ) {
        this.x = x
        this.y = y
        this.originX = originX
        this.originY = originY
        this.closest = closest
    }
}
