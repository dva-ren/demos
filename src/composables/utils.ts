import type { MaybeRef } from '@vueuse/core'

export function randomIntNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function randomFloatNumber(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function initCanvas(el: MaybeRef<HTMLCanvasElement | undefined>) {
  const canvas = unref(el)!
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  return canvas.getContext('2d')!
}
