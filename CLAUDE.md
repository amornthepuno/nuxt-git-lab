# CLAUDE.md

โปรเจกต์ฝึก Git/GitHub สำหรับมือใหม่ (Nuxt 4 + Vitest)

## คำสั่ง
- `npm run dev` — dev server ที่ http://localhost:3000
- `npm test` — unit test (Vitest)
- `npm run build` — build production

## กฎของ repo นี้
- ห้าม commit หรือ push เข้า `main` ตรงๆ — ทุกงานต้องแตก branch `feature/...` หรือ `fix/...` แล้วเปิด PR
- ใช้ Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`
- รัน `npm test` ก่อน commit เสมอ
- ผู้ใช้กำลังเรียน Git: ก่อนรันคำสั่ง git ให้อธิบายสั้นๆ เป็นภาษาไทยว่าคำสั่งนั้นทำอะไร
- ห้ามใช้ `git push --force` หรือ `git reset --hard` เว้นแต่ผู้ใช้ขอเอง
- แก้โค้ดให้น้อยและตรงจุด

## โครงสร้าง
- `app/pages/` — หน้าเว็บ (file-based routing)
- `app/components/` — component (auto-import)
- `app/utils/` — ฟังก์ชันช่วย (auto-import) มีเทสต์ใน `tests/`
- `.github/workflows/ci.yml` — CI: test + build
