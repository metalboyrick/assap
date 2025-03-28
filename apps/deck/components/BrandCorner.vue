<template>
  <div class="brand-corner">
    <span class="flag">🇮🇩</span>
    <img src="/superteam-logo.png" alt="Superteam" class="logo" />
  </div>
</template>

<style scoped>
.brand-corner {
  position: fixed;
  bottom: 0.5rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 100;
}

.flag {
  font-size: 2.5rem;
}

.logo {
  height: 2.5rem;
  width: auto;
  filter: brightness(0.9);
}
</style>
