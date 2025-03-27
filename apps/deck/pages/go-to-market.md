---
layout: center
class: "text-center dark-theme"
---

# Go-To-Market Strategy

<div class="roadmap-container">
  <div class="phase phase-1">
    <div class="phase-header">
      <div class="phase-icon">🚀</div>
      <div class="phase-title">
        <h2>Phase 1</h2>
        <div class="phase-timeline">Q1-Q2</div>
      </div>
    </div>
    <h3>Developer Adoption</h3>
    <ul class="phase-items">
      <li>Launch SDKs & APIs</li>
      <li>Developer hackathons</li>
      <li>Free attestations</li>
    </ul>
  </div>

  <div class="phase-connector">
    <div class="connector-line"></div>
  </div>

  <div class="phase phase-2">
    <div class="phase-header">
      <div class="phase-icon">🏢</div>
      <div class="phase-title">
        <h2>Phase 2</h2>
        <div class="phase-timeline">Q3-Q4</div>
      </div>
    </div>
    <h3>Institutional</h3>
    <ul class="phase-items">
      <li>Government pilots</li>
      <li>Enterprise clients</li>
      <li>Regulatory framework</li>
    </ul>
  </div>

  <div class="phase-connector">
    <div class="connector-line"></div>
  </div>

  <div class="phase phase-3">
    <div class="phase-header">
      <div class="phase-icon">🌏</div>
      <div class="phase-title">
        <h2>Phase 3</h2>
        <div class="phase-timeline">Year 2+</div>
      </div>
    </div>
    <h3>Standardization</h3>
    <ul class="phase-items">
      <li>Official recognition</li>
      <li>Public service adoption</li>
      <li>Global interoperability</li>
    </ul>
  </div>
</div>

<style>
.dark-theme {
  background-color: #000000;
  color: #ffffff;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

h2 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
}

h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0.3rem 0;
  color: #cccccc;
  text-align: center;
}

.roadmap-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0;
  width: 90%;
  margin: 0 auto;
}

.phase {
  background: #121212;
  border: 2px solid #333333;
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 30%;
}

.phase-1 {
  border-top: 6px solid #ffffff;
}

.phase-2 {
  border-top: 6px solid #bbbbbb;
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

.phase-timeline {
  background: #333333;
  color: #ffffff;
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
  color: #bbbbbb;
  font-size: 0.85rem;
}

.phase-items li:before {
  content: "→";
  position: absolute;
  left: 0;
  color: #ffffff;
  font-weight: bold;
}

.phase-items li:last-child {
  margin-bottom: 0;
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
  background: linear-gradient(to right, #ffffff, #bbbbbb, #777777);
  border-radius: 4px;
}
</style>
