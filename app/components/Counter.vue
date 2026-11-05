<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <div>
    <p>กดไปแล้ว: <strong>{{ count }}</strong> ครั้ง</p>
    <button @click="count++">กดเลย</button>
  </div>
</template>
