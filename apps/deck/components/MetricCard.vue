<script setup lang="ts">
defineProps({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  highlighted: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="metric-card" :class="{ highlighted }">
    <div class="metric-value">{{ value }}</div>
    <div class="metric-label">{{ label }}</div>
  </div>
</template>

<style scoped>
.metric-card {
  background: var(--slidev-theme-surface);
  border: 1px solid var(--slidev-theme-border);
  border-radius: 8px;
  padding: 1.25rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.highlighted {
  background-color: var(--slidev-theme-highlight);
  border-left: 4px solid var(--slidev-theme-accent);
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--slidev-theme-text);
}

.metric-label {
  font-size: 0.9rem;
  color: var(--slidev-theme-text-muted);
}
</style>
