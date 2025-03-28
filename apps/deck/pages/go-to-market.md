---
layout: center
transition: slide-left
hide: true
---

# Go-To-Market Strategy

<div class="roadmap-container">
  <RoadmapPhase
    :phaseNumber="1"
    icon="🚀"
    timeline="Q1-Q2"
    title="Developer Adoption"
    :items="[
      'Launch SDKs & APIs',
      'Developer hackathons',
      'Free attestations'
    ]"
  />
  
  <div class="phase-connector">
    <div class="connector-line"></div>
  </div>
  
  <RoadmapPhase
    :phaseNumber="2"
    icon="🏢"
    timeline="Q3-Q4"
    title="Institutional"
    :items="[
      'Government pilots',
      'Enterprise clients',
      'Regulatory framework'
    ]"
  />
  
  <div class="phase-connector">
    <div class="connector-line"></div>
  </div>
  
  <RoadmapPhase
    :phaseNumber="3"
    icon="🌏"
    timeline="Year 2+"
    title="Standardization"
    :items="[
      'Official recognition',
      'Public service adoption',
      'Global interoperability'
    ]"
  />
</div>

---

```yaml
layout: default
```

# 📅 The Vision

<div class="timeline-container">
  <div class="timeline-section">
    <h2 class="timeline-header">Current</h2>
    <div class="timeline-items">
      <TimelineItem 
        color="#ffffff"
        text="🔗 Onchain Attestations"
      />
      <TimelineItem 
        color="#ffffff"
        text="👤 Basic Anti-sybil scoring mechanism"
      />
    </div>

  </div>

  <div class="timeline-section">
    <h2 class="timeline-header">Near Future</h2>
    <div class="timeline-items">
      <TimelineItem 
        color="#ffffff"
        text="📡 Offchain Attestations"
      />
      <TimelineItem 
        color="#ffffff"
        text="🔐 National Identity safe Privacy sybil scoring"
      />
    </div>
  </div>

  <div class="timeline-section">
    <h2 class="timeline-header">Distant Future</h2>
    <div class="timeline-items">
      <TimelineItem 
        color="#ffffff"
        text="🌐 Global Notarial Applications"
      />
      <TimelineItem 
        color="#ffffff"
        text="🏛️ National Notarial Applications"
      />
    </div>
  </div>
</div>

<style>
.roadmap-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0;
  width: 90%;
  margin: 0 auto;
}

.phase-connector {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
}

.connector-line {
  height: 3px;
  width: 100%;
  background: linear-gradient(to right, var(--slidev-theme-text), var(--slidev-theme-text-muted), #777777);
  border-radius: 4px;
}

.timeline-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
  gap: 1rem;
}

.timeline-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-header {
  color: #000000;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.timeline-section:not(:last-child) {
  border-right: 2px dashed rgba(0, 0, 0, 0.3);
  padding-right: 2rem;
}

@media (max-width: 768px) {
  .roadmap-container {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .phase-connector {
    transform: rotate(90deg);
    height: 2rem;
    width: auto;
  }
}
</style>
