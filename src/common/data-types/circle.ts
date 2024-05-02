import type { Point } from './point'

export class Circle {
    point: Point
    radius: number
    color: string
    active: number = 0

    constructor(point: Point, radius: number, color: string) {
        this.point = point
        this.radius = radius
        this.color = color
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) {
            return
        }

        ctx.beginPath()
        ctx.arc(this.point.x, this.point.y, this.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'rgba(156,217,249,' + this.active + ')'
        ctx.fill()
    }
}
