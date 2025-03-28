<script setup lang="ts">
defineProps({
  initial: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  bio: {
    type: Array as () => string[],
    required: true,
  },
});
</script>

<template>
  <div class="member">
    <div class="circle">{{ initial }}</div>
    <div class="info">
      <h4>
        {{ name }} <span class="position">{{ position }}</span>
      </h4>
      <ul class="bio-list">
        <li v-for="(point, index) in bio" :key="index">
          {{ point }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.member {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
  background: var(--slidev-theme-surface);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--slidev-theme-border);
  color: var(--slidev-theme-text);
}

.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--slidev-theme-border);
  color: var(--slidev-theme-text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
  filter: grayscale(100%);
  margin-top: 0.3rem;
}

.info h4 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--slidev-theme-text);
}

.position {
  font-size: 0.9rem;
  color: var(--slidev-theme-text-muted);
  font-weight: normal;
}

.bio-list {
  margin: 0.4rem 0 0;
  padding-left: 1.2rem;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--slidev-theme-text-muted);
}

.bio-list li {
  margin-bottom: 0.3rem;
}
</style>
