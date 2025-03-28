<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  highlighted: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="section-card" :class="{ highlighted }">
    <div v-if="icon" class="card-icon">{{ icon }}</div>
    <div class="card-content">
      <h3 v-if="title">{{ title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.section-card {
  background: var(--slidev-theme-surface);
  border: 1px solid var(--slidev-theme-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.highlighted {
  background-color: var(--slidev-theme-highlight);
  border-left: 4px solid var(--slidev-theme-accent);
}

.card-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 0.25rem;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--slidev-theme-text);
}
</style>
