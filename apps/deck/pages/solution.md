---
transition: zoom
layout: two-cols-header
class: solution-slide
---

# How ASSAP Works

::left::

<div class="solution-pillar">
  <div class="pillar-icon">🛡️</div>
  <h3>Sybil-Resistant Verification</h3>
  <p>zkTLS-powered proof generation for verifiable Web2 data</p>
</div>

<div class="solution-pillar">
  <div class="pillar-icon">🔌</div>
  <h3>Programmable Attestations</h3>
  <p>Custom rules and conditional verification for flexible use cases</p>
</div>

<div class="solution-pillar">
  <div class="pillar-icon">📱</div>
  <h3>Human-Friendly Interface</h3>
  <p>Mobile-first approach with familiar Web2-like UX</p>
</div>

::right::

<div class="architecture-container">
  <!-- <img src="/architecture.svg" alt="ASSAP Architecture" class="architecture-diagram" /> -->
  <div class="placeholder-diagram">ASSAP Architecture Diagram</div>
  
  <div class="key-features">
    <div class="feature">
      <span class="feature-icon">⚡</span>
      <span class="feature-text">Solana-native for speed & low cost</span>
    </div>
    <div class="feature">
      <span class="feature-icon">🔗</span>
      <span class="feature-text">Chain-agnostic verification</span>
    </div>
    <div class="feature">
      <span class="feature-icon">🔐</span>
      <span class="feature-text">Custody-free attestation management</span>
    </div>
  </div>
</div>

<style>
/* Base styles */
.solution-slide {
  color: #ffffff;
  background-color: #000000;
}

h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: #ffffff;
}

p {
  font-size: 0.8rem;
  margin: 0;
  color: #bbbbbb;
  line-height: 1.3;
}

/* Left column - Solution pillars */
.solution-pillar {
  background: #121212;
  border: 1px solid #333333;
  border-left: 4px solid #ffffff;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.pillar-icon {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

/* Right column - Architecture diagram */
.architecture-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;
}

.placeholder-diagram {
  width: 100%;
  height: 150px;
  border: 1px solid #333333;
  border-radius: 6px;
  padding: 0.75rem;
  background: #121212;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555555;
  font-style: italic;
  margin-bottom: 1rem;
}

.key-features {
  margin-top: auto;
}

.feature {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.feature-icon {
  font-size: 1rem;
  margin-right: 0.5rem;
  display: inline-block;
}

.feature-text {
  font-size: 0.8rem;
  color: #bbbbbb;
}
</style>

---

```yaml
layout: default
```

# How ASSAP Works

<div class="workflow-container">
  <div class="workflow-step">
    <div class="step-number">1</div>
    <div class="step-content">
      <h3>Proof Generation</h3>
      <p>User connects Web2 account and generates zkTLS proof without exposing credentials</p>
    </div>
  </div>
  
  <div class="workflow-arrow">→</div>
  
  <div class="workflow-step">
    <div class="step-number">2</div>
    <div class="step-content">
      <h3>Attestation Creation</h3>
      <p>Verifiable attestation on Solana with programmable permissions</p>
    </div>
  </div>
  
  <div class="workflow-arrow">→</div>
  
  <div class="workflow-step">
    <div class="step-number">3</div>
    <div class="step-content">
      <h3>Verification</h3>
      <p>One-click verification with no complex integration needed</p>
    </div>
  </div>
</div>

<div class="benefits-container">
  <div class="benefit">
    <span class="benefit-metric">73%</span>
    <span class="benefit-description">Reduction in sybil attacks</span>
  </div>
  
  <div class="benefit">
    <span class="benefit-metric">95%</span>
    <span class="benefit-description">Faster onboarding</span>
  </div>
  
  <div class="benefit">
    <span class="benefit-metric">100%</span>
    <span class="benefit-description">Data privacy</span>
  </div>
</div>

<style>
.workflow-container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 2rem;
  width: 85%;
}

.workflow-step {
  background: #121212;
  border: 1px solid #333333;
  border-radius: 6px;
  padding: 0.75rem;
  width: 30%;
  display: flex;
  flex-direction: column;
}

.step-number {
  background: #333333;
  color: #ffffff;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.workflow-arrow {
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
}

.benefits-container {
  display: flex;
  justify-content: space-around;
  width: 70%;
}

.benefit {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.benefit-metric {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
}

.benefit-description {
  font-size: 0.8rem;
  color: #bbbbbb;
  margin-top: 0.3rem;
}

h1 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #ffffff;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.3rem;
  color: #ffffff;
}

p {
  color: #bbbbbb;
  font-size: 0.75rem;
  line-height: 1.3;
}
</style>
