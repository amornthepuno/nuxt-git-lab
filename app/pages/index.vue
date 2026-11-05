<script setup lang="ts">
// 👉 แบบฝึกหัดที่ 1: เปลี่ยนชื่อตรงนี้เป็นชื่อของคุณ แล้ว commit
const ownerName = 'UNO'
</script>

<template>
  <section>
    <h1>{{ greet(ownerName) }}</h1>
    <p>นี่คือโปรเจกต์สำหรับฝึก Git + GitHub + Claude Code</p>
    <Counter />
  </section>
</template>
