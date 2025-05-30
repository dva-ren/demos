export class Star {
  x: number
  y: number
  radius: number
  color: string
  speed: number

  constructor(x: number, y: number, radius: number, speed: number, color: string) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.speed = speed
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  drawHeart(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.bezierCurveTo(this.x - this.radius / 2, this.y - this.radius / 3, this.x - this.radius, this.y + this.radius / 3, this.x, this.y + this.radius)
    ctx.bezierCurveTo(this.x + this.radius, this.y + this.radius / 3, this.x + this.radius / 2, this.y - this.radius / 3, this.x, this.y)
    // ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    // ctx.fill()
    ctx.closePath()
    ctx.strokeStyle = this.color
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.closePath()
  }

  update(canvasHeight: number) {
    this.y -= this.speed
    if (this.y < 0) {
      this.y = canvasHeight
    }
  }
}

export function createStars(
  count: number,
  radius: number,
  speed: number,
  canvasWidth: number,
  canvasHeight: number,
): Star[] {
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.random() * canvasWidth
    const y = Math.random() * canvasHeight
    const color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
    stars.push(new Star(x, y, radius, speed, color))
  }
  return stars
}

export function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
) {
  stars.forEach((star) => {
    star.drawHeart(ctx)
    star.update(ctx.canvas.height)
  })
}
