import { randomIntNumber } from '~/composables/utils'

interface Position {
  x: number
  y: number
}

export default class Graph {
  private positionArray: Array<Position>
  ctx: CanvasRenderingContext2D
  food: Position = {
    x: 420,
    y: 400,
  }

  maxX: number
  maxY: number
  flag = true
  direction: 'left' | 'right' | 'up' | 'down' = 'right'
  frame = 0
  requestId = 0
  initLength = 50
  constructor(public canvas: HTMLCanvasElement, public pointSize = 20) {
    this.ctx = canvas.getContext('2d')!
    this.positionArray = Array.from({ length: this.initLength }).fill(0).map((_, idx) => ({
      x: idx * this.pointSize + 120,
      y: 100,
    }))
    this.maxX = Math.floor(canvas.width / this.pointSize)
    this.maxY = Math.floor(canvas.height / this.pointSize)
    this.randomFood()
  }

  drawPoint(p: Position, color?: string) {
    this.ctx.beginPath()
    this.ctx.arc(p.x, p.y, this.pointSize / 2, 0, Math.PI * 2)
    this.ctx.fillStyle = color || 'rgb(224,224,224)'
    this.ctx.fill()
    this.ctx.closePath()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.positionArray.length; i++) {
      const p = this.positionArray[i]
      this.drawPoint(p)
    }
    this.drawPoint(this.food, 'green')
    this.move()
  }

  // clear() {
  //   for (let i = 0; i < this.fillArray.length; i++)
  //     this.grid.value[this.fillArray[i][1]][this.fillArray[i][0]].fill = false
  // }

  left() {
    if (this.direction === 'left' || this.direction === 'right')
      return
    this.direction = 'left'
  }

  right() {
    if (this.direction === 'right' || this.direction === 'left')
      return
    this.direction = 'right'
  }

  up() {
    if (this.direction === 'up' || this.direction === 'down')
      return
    this.direction = 'up'
  }

  down() {
    if (this.direction === 'down' || this.direction === 'up')
      return
    this.direction = 'down'
  }

  move() {
    const endIndex = this.positionArray.length - 1
    const endP = this.positionArray[0]
    const temp = {
      x: endP.x,
      y: endP.y,
    }
    // console.log(endP)
    switch (this.direction) {
      case 'right':{
        temp.x = this.positionArray[endIndex].x + this.pointSize
        temp.y = this.positionArray[endIndex].y
        break
      }
      case 'left':{
        temp.x = this.positionArray[endIndex].x - this.pointSize
        temp.y = this.positionArray[endIndex].y
        break
      }
      case 'up':{
        temp.x = this.positionArray[endIndex].x
        temp.y = this.positionArray[endIndex].y - this.pointSize
        break
      }
      case 'down':{
        temp.x = this.positionArray[endIndex].x
        temp.y = this.positionArray[endIndex].y + this.pointSize
        break
      }
    }
    if (temp.x !== this.food.x || temp.y !== this.food.y)
      this.positionArray.shift()
    else
      this.randomFood()

    this.positionArray.push(temp)
    this.verify()
  }

  randomFood() {
    this.food.x = randomIntNumber(0, this.maxX) * this.pointSize
    this.food.y = randomIntNumber(0, this.maxY) * this.pointSize
  }

  verify() {
    const head = this.positionArray[this.positionArray.length - 1]
    if (head.x < 0 || head.x > this.canvas.width || head.y < 0 || head.y > this.canvas.height)
      this.stop()
    for (let i = 0; i < this.positionArray.length - 2; i++) {
      const p = this.positionArray[i]
      if (p.x === head.x && p.y === head.y)
        this.stop()
    }
  }

  start() {
    this.requestId = requestAnimationFrame(() => {
      if (!this.flag)
        return
      if (this.frame % 6 === 0)
        this.draw()
      this.start()
      this.frame++
      if (this.frame > 100)
        this.frame = 0
    })
  }

  stop() {
    this.flag = false
    cancelAnimationFrame(this.requestId)
    // eslint-disable-next-line no-alert
    alert('游戏结束')
  }
}
