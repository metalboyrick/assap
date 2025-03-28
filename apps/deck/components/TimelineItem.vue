<!-- TimelineItem.vue -->
<template>
  <div class="timeline-item">
    <div class="timeline-dot" :style="{ backgroundColor: color }"></div>
    <div class="timeline-text">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "#7c3aed",
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-color: white;
  border-width: 1px;
  border-radius: 999px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.timeline-text {
  font-size: 0.9rem;
  line-height: 1.2;
  padding-right: 1rem;
}
</style>
