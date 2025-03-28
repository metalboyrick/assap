---
layout: center
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
