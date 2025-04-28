function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

export class Point {
  xSpeed: number
  ySpeed: number
  baseSpeed = 1.5
  constructor(public x: number, public y: number, public size: number) {
    this.xSpeed = Math.random() > 0.5 ? Math.random() : -Math.random()
    this.ySpeed = Math.random() > 0.5 ? Math.random() : -Math.random()
    this.xSpeed = this.xSpeed * this.baseSpeed
    this.ySpeed = this.ySpeed * this.baseSpeed
  }

  reverseX() {
    this.xSpeed = -this.xSpeed
  }

  reverseY() {
    this.ySpeed = -this.ySpeed
  }

  move() {
    this.x += this.xSpeed
    this.y += this.ySpeed
  }
}

export class Line {
  points: Point[]
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  pointSize = 3
  constructor(public canvas: HTMLCanvasElement, count = 100, public maxLen = 160) {
    this.ctx = canvas.getContext('2d')!
    this.points = Array.from({ length: count }).fill(0).map(() => new Point(randomNumber(0, canvas.width), randomNumber(0, canvas.height), this.pointSize))
    this.currentPoint = new Point(0, 0, 1)
    this.currentPoint.move = () => {}
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const { x, y } = e
      this.currentPoint.x = x
      this.currentPoint.y = y
    })
    this.points.push(this.currentPoint)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.points.length; i++) {
      const startPoint = this.points[i]
      this.ctx.arc(startPoint.x, startPoint.y, startPoint.size, 0, Math.PI * 2)
      this.ctx.fillStyle = 'rgb(100,100,100)'
      this.ctx.fill()
      for (let j = 0; j < this.points.length; j++) {
        const endPoint = this.points[j]
        const len = Math.sqrt((startPoint.x - endPoint.x) ** 2 + (startPoint.y - endPoint.y) ** 2)
        if (len > this.maxLen)
          continue
        this.ctx.beginPath()
        this.ctx.moveTo(startPoint.x, startPoint.y)
        this.ctx.lineTo(endPoint.x, endPoint.y)
        this.ctx.closePath()
        this.ctx.strokeStyle = `rgba(100,100,100,${1 - len / this.maxLen})`
        this.ctx.stroke()
      }
      startPoint.move()
      if (startPoint.x < 0 || startPoint.x > this.canvas.width)
        startPoint.reverseX()

      if (startPoint.y < 0 || startPoint.y > this.canvas.height)
        startPoint.reverseY()
    }
  }
}
