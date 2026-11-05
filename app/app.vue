<template>
  <div class="layout">
    <header>
      <NuxtLink to="/">🏠 Home</NuxtLink>
      <NuxtLink to="/about">ℹ️ About</NuxtLink>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>Nuxt Git Lab — ฝึก Git ทีละ commit</footer>
  </div>
</template>

<style>
body { font-family: system-ui, sans-serif; margin: 0; background: #f6f7f9; color: #1f2937; }
.layout { max-width: 720px; margin: 0 auto; padding: 24px 16px; }
header { display: flex; gap: 16px; margin-bottom: 24px; }
header a { color: #00a368; text-decoration: none; font-weight: 600; }
footer { margin-top: 48px; color: #6b7280; font-size: 14px; }
button { padding: 8px 16px; border: 0; border-radius: 8px; background: #00dc82; color: #052e16; font-weight: 600; cursor: pointer; }
</style>
