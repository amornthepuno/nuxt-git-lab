/** สร้างข้อความทักทาย — มี unit test คุมอยู่ (tests/greet.test.ts) */
export function greet(name: string): string {
  const trimmed = name.trim()
  return trimmed ? `หวัสดี, ${trimmed}! 👋` : 'สวัสดี! 👋'
}
