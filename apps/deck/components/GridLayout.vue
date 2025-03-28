<script setup lang="ts">
defineProps({
  columns: {
    type: Number,
    default: 2,
  },
  gap: {
    type: String,
    default: "1rem",
  },
});
</script>

<template>
  <div
    class="grid-layout"
    :style="{
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap,
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  width: 100%;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr !important;
  }
}
</style>
