import { describe, expect, it } from 'vitest'
import { greet } from '../app/utils/greet'

describe('greet', () => {
  it('ทักทายด้วยชื่อ', () => {
    expect(greet('Ploy')).toBe('สวัสดี, Ploy! 👋')
  })

  it('ตัดช่องว่างหัวท้าย', () => {
    expect(greet('  Ploy  ')).toBe('สวัสดี, Ploy! 👋')
  })

  it('ถ้าไม่มีชื่อ ทักทายแบบทั่วไป', () => {
    expect(greet('')).toBe('สวัสดี! 👋')
  })
})
