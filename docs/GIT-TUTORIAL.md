# คู่มือฝึก Git + GitHub + Claude Code ด้วย Nuxt (ทีละขั้น)

> เป้าหมาย: ทำครบวงจรจริง 1 รอบ — **project → repo → commit → push → branch → Pull Request → CI → code review → merge → pull**
> แต่ละบทแก้โค้ดแค่ 1–3 บรรทัด เพื่อให้โฟกัสที่ Git ไม่ใช่โค้ด

---

## บทที่ 0 — เตรียมเครื่อง (Windows)

ติดตั้ง (กด Next ไปเรื่อยๆ ได้):

| โปรแกรม | ใช้ทำอะไร | ดาวน์โหลด |
|---|---|---|
| Git for Windows | คำสั่ง `git` (มี Git Bash ให้ด้วย) | https://git-scm.com/download/win |
| Node.js 22 LTS | รัน Nuxt | https://nodejs.org |
| VS Code | แก้โค้ด + ดู diff สวยๆ | https://code.visualstudio.com |
| GitHub CLI (ไม่บังคับ) | login GitHub / สร้าง PR จาก terminal | https://cli.github.com |
| Claude Code | ผู้ช่วยเขียนโค้ดใน terminal | https://docs.claude.com/en/docs/claude-code |

สมัครบัญชีที่ https://github.com ก่อน แล้วเปิด terminal (PowerShell หรือ Git Bash) ตั้งค่าตัวตนครั้งเดียว:

```bash
git config --global user.name  "ชื่อของคุณ"
git config --global user.email "อีเมลที่ใช้สมัคร GitHub"
git config --global init.defaultBranch main
git config --global core.autocrlf true   # Windows: กันปัญหาขึ้นบรรทัดใหม่

gh auth login        # เลือก GitHub.com → HTTPS → Login with a web browser
```

ตรวจว่าพร้อม: `git --version` · `node -v` · `gh auth status`

---

## บทที่ 1 — เข้าใจภาพรวมก่อนพิมพ์คำสั่ง

Git เก็บประวัติไฟล์เป็น "snapshot" เรียกว่า **commit** ไฟล์จะเดินทางผ่าน 4 ที่:

```
 Working Directory  ──git add──▶  Staging Area  ──git commit──▶  Local Repo  ──git push──▶  Remote (GitHub)
  (ไฟล์ที่แก้อยู่)               (เลือกว่าจะเก็บอะไร)            (ประวัติในเครื่อง)          (ประวัติบนเว็บ)
                                                                     ◀──────── git pull ────────
```

| คำ | ความหมายแบบบ้านๆ |
|---|---|
| **repository (repo)** | โฟลเดอร์โปรเจกต์ + ประวัติทั้งหมด (โฟลเดอร์ซ่อน `.git`) |
| **commit** | จุด save พร้อมข้อความอธิบาย ย้อนกลับมาได้เสมอ |
| **branch** | เส้นทางแยกสำหรับทำงานโดยไม่กระทบ `main` |
| **push / pull** | ส่งขึ้น / ดึงลงจาก GitHub |
| **Pull Request (PR)** | "ขออนุญาตรวม branch นี้เข้า main" + พื้นที่รีวิว |
| **merge** | รวม branch เข้าด้วยกัน |
| **CI** | หุ่นยนต์ที่รันเทสต์/build ให้อัตโนมัติทุกครั้งที่ push หรือเปิด PR |

---

## บทที่ 2 — รันโปรเจกต์ให้ได้ก่อน

แตกไฟล์ zip ไว้ที่ เช่น `C:\dev\nuxt-git-lab` แล้ว:

```bash
cd C:\dev\nuxt-git-lab
npm install
npm run dev
```

เปิด http://localhost:3000 → ต้องเห็น **"สวัสดี, Your Name! 👋"** และปุ่ม +1 กด `Ctrl + C` เพื่อหยุด

ลองรันเทสต์ด้วย: `npm test` → ต้องเห็น `3 passed`

---

## บทที่ 3 — `init` / `add` / `commit` (Git ในเครื่อง)

```bash
git init                 # เปลี่ยนโฟลเดอร์นี้เป็น repo
git status               # ดูสถานะ — ใช้บ่อยที่สุด! ไฟล์สีแดง = ยังไม่ add
git add .                # เอาทุกไฟล์เข้า staging (node_modules ถูกข้ามเพราะ .gitignore)
git status               # ตอนนี้กลายเป็นสีเขียว
git commit -m "chore: initial Nuxt project"
git log --oneline        # ดูประวัติ
```

✏️ **แบบฝึกหัด 3.1** — เปิด `app/pages/index.vue` เปลี่ยน `'Your Name'` เป็นชื่อคุณ แล้ว:

```bash
git diff                 # ดูว่าแก้อะไร (- คือของเดิม, + คือของใหม่)
git add app/pages/index.vue
git commit -m "feat: show my name on home page"
git log --oneline        # ตอนนี้มี 2 commit
```

💡 ข้อความ commit ที่ดี: `ประเภท: ทำอะไร` เช่น `feat:` (ฟีเจอร์), `fix:` (แก้บั๊ก), `docs:`, `chore:`

---

## บทที่ 4 — สร้าง repo บน GitHub แล้ว `push`

**ทางเว็บ:** github.com → ปุ่ม **New** → ชื่อ `nuxt-git-lab` → **ไม่ต้อง** ติ๊ก README/.gitignore (เรามีแล้ว) → Create แล้วรัน:

```bash
git remote add origin https://github.com/<username>/nuxt-git-lab.git
git push -u origin main      # -u = จำไว้ว่า main คู่กับ origin/main ครั้งต่อไปพิมพ์แค่ git push
```

**หรือทาง gh (คำสั่งเดียว):** `gh repo create nuxt-git-lab --public --source=. --push`

รีเฟรชหน้า GitHub → เห็นไฟล์ครบ และแท็บ **Actions** จะมี CI รันอยู่ (บทที่ 7 จะอธิบาย)

---

## บทที่ 5 — แตก `branch` ทำฟีเจอร์ใหม่

กฎทอง: **ไม่แก้บน `main` ตรงๆ** ทุกงานเริ่มจาก branch ใหม่

```bash
git switch main
git pull                              # อัปเดต main ให้ล่าสุดก่อนแตกเสมอ
git switch -c feature/about-page      # สร้าง + ย้ายไป branch ใหม่
git branch                            # * อยู่หน้า branch ปัจจุบัน
```

✏️ **แบบฝึกหัด 5.1** — เปิด `app/pages/about.vue` เพิ่มบรรทัดในลิสต์:

```html
<li>git branch / switch</li>
```

```bash
git add .
git commit -m "feat: add branch topic to about page"
git push -u origin feature/about-page
```

---

## บทที่ 6 — เปิด Pull Request

```bash
gh pr create --fill          # หรือไปที่ GitHub จะมีปุ่มเหลือง "Compare & pull request"
```

ในหน้า PR จะเห็น 3 แท็บสำคัญ:
- **Conversation** — คำอธิบาย (เติมตาม template ที่เตรียมไว้) และความคิดเห็น
- **Commits** — commit ที่อยู่ใน branch นี้
- **Files changed** — diff ทั้งหมด ← ที่นี่คือที่ทำ code review

---

## บทที่ 7 — CI: หุ่นยนต์ตรวจโค้ด

ไฟล์ `.github/workflows/ci.yml` สั่งให้ GitHub ทำ 3 อย่างทุกครั้งที่ push/เปิด PR: `npm ci` → `npm test` → `npm run build`
ดูผลที่ด้านล่างหน้า PR: ✅ ผ่าน / ❌ ไม่ผ่าน (กด **Details** ดู log)

✏️ **แบบฝึกหัด 7.1 — ทำให้ CI พังโดยตั้งใจ** (สำคัญมาก จะได้รู้ว่าพังแล้วเป็นยังไง)

ใน branch เดิม เปิด `app/utils/greet.ts` เปลี่ยน `สวัสดี` ตัวแรกเป็น `หวัดดี` แล้ว:

```bash
npm test                     # พังในเครื่องก่อน — เห็นไหมว่าเทสต์จับได้
git commit -am "test: break CI on purpose"
git push
```

ดู PR → CI เป็น ❌ → แก้กลับเป็น `สวัสดี` → `git commit -am "fix: restore greeting"` → `git push` → CI ✅
(PR อัปเดตเองอัตโนมัติ ไม่ต้องเปิดใหม่)

🔒 เสริม: Settings → Branches → Add rule สำหรับ `main` → ติ๊ก *Require status checks to pass* → เลือก `test-and-build` = ห้าม merge ถ้า CI แดง

---

## บทที่ 8 — Code Review

**รีวิวเองบน GitHub:** แท็บ Files changed → เอาเมาส์ชี้บรรทัด → กด **+** เขียนคอมเมนต์ → **Review changes** แล้วเลือก
- *Comment* = ความเห็นทั่วไป
- *Approve* = โอเค merge ได้ (PR ของตัวเอง approve ไม่ได้ — ชวนเพื่อนมาเป็น reviewer ได้)
- *Request changes* = ต้องแก้ก่อน

แก้ตามคอมเมนต์ = แค่ commit + push เพิ่มใน branch เดิม

**ให้ Claude Code ช่วยรีวิว:** ในโฟลเดอร์โปรเจกต์พิมพ์ `claude` แล้วสั่งเป็นภาษาไทยได้เลย เช่น

```
ช่วยรีวิวการเปลี่ยนแปลงใน branch นี้เทียบกับ main หน่อย มีอะไรควรแก้ไหม
```

---

## บทที่ 9 — Merge แล้วเก็บกวาด

ในหน้า PR (เมื่อ CI ✅) เลือกวิธี merge:

| ปุ่ม | ผลลัพธ์ | แนะนำเมื่อ |
|---|---|---|
| Create a merge commit | เก็บทุก commit + เพิ่ม commit "Merge" | อยากเก็บประวัติละเอียด |
| **Squash and merge** | รวมทุก commit ใน PR เหลือ 1 commit | ✅ มือใหม่/ทีมส่วนใหญ่ — main สะอาด |
| Rebase and merge | ต่อ commit เรียงตรงๆ | ทีมที่ถนัด rebase |

หลัง merge กด **Delete branch** แล้วกลับมาที่เครื่อง:

```bash
git switch main
git pull                              # ดึง commit ที่เพิ่ง merge ลงมา
git branch -d feature/about-page      # ลบ branch ในเครื่อง
git log --oneline --graph             # ดูประวัติ
```

🎉 จบวงจร 1 รอบแล้ว! วนซ้ำบทที่ 5–9 ทุกฟีเจอร์

---

## บทที่ 10 — `pull` และ Merge Conflict (เจอแน่ ไม่ต้องกลัว)

conflict เกิดเมื่อ 2 ฝั่งแก้ **บรรทัดเดียวกัน** — Git เลือกให้ไม่ได้ เลยถามเรา

✏️ **แบบฝึกหัด 10.1 — สร้าง conflict เอง**

1. บน GitHub เปิด `app/components/Counter.vue` → ไอคอนดินสอ → เปลี่ยน `+1` เป็น `เพิ่ม` → Commit directly to main
2. ในเครื่อง (ยังไม่ pull!) แตก branch ใหม่: `git switch -c feature/button-text`
3. แก้บรรทัดเดียวกันเป็น `กดเลย` → `git commit -am "feat: change button text"`
4. ดึง main ล่าสุดมารวม: `git pull origin main` → 💥 `CONFLICT`

เปิดไฟล์ใน VS Code จะเห็น:

```
<<<<<<< HEAD
    <button @click="count++">กดเลย</button>
=======
    <button @click="count++">เพิ่ม</button>
>>>>>>> main
```

กด *Accept Current / Incoming / Both* หรือแก้มือให้เหลือแบบที่ต้องการ (ลบเครื่องหมาย `<<<` `===` `>>>` ทิ้งให้หมด) แล้ว:

```bash
git add app/components/Counter.vue
git commit -m "merge: resolve button text conflict"
git push -u origin feature/button-text
```

---

## บทที่ 11 — ใช้ Claude Code ช่วยทำงานกับ Git

เปิด terminal ในโฟลเดอร์โปรเจกต์ → พิมพ์ `claude` ตัวอย่างคำสั่ง:

| อยากทำ | พิมพ์บอก Claude |
|---|---|
| เพิ่มฟีเจอร์เล็กๆ | `แตก branch feature/dark-mode แล้วเพิ่มปุ่มสลับ dark mode ในหน้า home` |
| เขียน commit | `ดู diff แล้ว commit ให้หน่อย ใช้ข้อความแบบ conventional commits` |
| เปิด PR | `push branch นี้แล้วเปิด PR ด้วย gh` |
| อธิบาย | `อธิบายว่า git log --graph ตอนนี้หมายความว่าอะไร` |
| แก้ conflict | `ช่วยแก้ merge conflict ในไฟล์นี้ และอธิบายว่าเลือกแบบไหนเพราะอะไร` |
| CI พัง | `CI พังใน PR #2 ช่วยดูสาเหตุแล้วแก้` |

💡 Claude จะถามก่อนรันคำสั่งที่เปลี่ยนแปลงไฟล์หรือ push — **อ่านคำสั่งก่อนกด Yes** ทุกครั้ง นี่คือวิธีเรียน Git ที่ดีมาก
ไฟล์ `CLAUDE.md` ในโปรเจกต์บอกกฎของ repo นี้ให้ Claude รู้ (เช่น ห้าม push เข้า main ตรงๆ)

---

## 🆘 ภาคผนวก — พลาดแล้วแก้ยังไง

| สถานการณ์ | คำสั่ง |
|---|---|
| แก้ไฟล์มั่ว อยากกลับเป็นแบบ commit ล่าสุด | `git restore <ไฟล์>` |
| `git add` ผิดไฟล์ | `git restore --staged <ไฟล์>` |
| พิมพ์ข้อความ commit ผิด (ยังไม่ push) | `git commit --amend -m "ข้อความใหม่"` |
| commit ไปแล้ว อยากยกเลิกแต่เก็บโค้ดไว้ (ยังไม่ push) | `git reset --soft HEAD~1` |
| commit ที่ push ไปแล้วอยากย้อน | `git revert <commit-id>` (สร้าง commit กลับด้าน — ปลอดภัย) |
| เผลอแก้บน main | `git switch -c feature/xxx` (การแก้จะตามมาด้วย) |
| อยากพักงานไว้ก่อนสลับ branch | `git stash` → ทำอย่างอื่น → `git stash pop` |

⚠️ หลีกเลี่ยง `git push --force` และ `git reset --hard` จนกว่าจะเข้าใจดี — ทำให้งานหายได้

## 📋 Cheat Sheet (วงจรประจำวัน)

```bash
git switch main && git pull               # 1. เริ่มจาก main ล่าสุด
git switch -c feature/<ชื่องาน>           # 2. แตก branch
# ... แก้โค้ด, npm run dev, npm test ...
git add . && git commit -m "feat: ..."    # 3. commit (ทำบ่อยๆ ได้)
git push -u origin feature/<ชื่องาน>      # 4. push
gh pr create --fill                       # 5. เปิด PR → รอ CI ✅ → review
# 6. Squash and merge บน GitHub แล้ว:
git switch main && git pull && git branch -d feature/<ชื่องาน>
```
