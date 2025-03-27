<template>
  <div class="brand-corner">
    <span class="flag">🇮🇩</span>
    <img src="/superteam-logo.png" alt="Superteam" class="logo" />
  </div>
</template>

<style scoped>
.brand-corner {
  position: fixed;
  bottom: 0.3rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 100;
}

.flag {
  font-size: 3rem;
}

.logo {
  height: 3rem;
  width: auto;
}
</style>
