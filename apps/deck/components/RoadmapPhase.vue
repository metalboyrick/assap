<script setup lang="ts">
defineProps({
  phaseNumber: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  timeline: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array as () => string[],
    required: true,
  },
});
</script>

<template>
  <div class="phase" :class="`phase-${phaseNumber}`">
    <div class="phase-header">
      <div class="phase-icon">{{ icon }}</div>
      <div class="phase-title">
        <h3>Phase {{ phaseNumber }}</h3>
        <div class="phase-timeline">{{ timeline }}</div>
      </div>
    </div>
    <h4>{{ title }}</h4>
    <ul class="phase-items">
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped>
.phase {
  background: var(--slidev-theme-surface);
  border: 2px solid var(--slidev-theme-border);
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.phase-1 {
  border-top: 6px solid var(--slidev-theme-text);
}

.phase-2 {
  border-top: 6px solid var(--slidev-theme-text-muted);
}

.phase-3 {
  border-top: 6px solid #777777;
}

.phase-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
  text-align: center;
}

.phase-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.phase-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.phase h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--slidev-theme-text);
}

.phase h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0.3rem 0;
  color: var(--slidev-theme-text-muted);
  text-align: center;
}

.phase-timeline {
  background: var(--slidev-theme-border);
  color: var(--slidev-theme-text);
  font-weight: 600;
  font-size: 0.7rem;
  padding: 0.1rem 0.5rem;
  border-radius: 8px;
  margin-top: 0.3rem;
}

.phase-items {
  text-align: left;
  padding-left: 0.75rem;
  margin: 0;
  flex-grow: 1;
}

.phase-items li {
  margin-bottom: 0.4rem;
  list-style-type: none;
  position: relative;
  padding-left: 1rem;
  color: var(--slidev-theme-text-muted);
  font-size: 0.85rem;
}

.phase-items li:before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--slidev-theme-text);
  font-weight: bold;
}

.phase-items li:last-child {
  margin-bottom: 0;
}
</style>
