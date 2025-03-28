---
transition: zoom
layout: two-cols-header
class: solution-slide
---

# How ASSAP Works

::left::

<SectionCard title="Sybil-Resistant Verification" icon="🛡️">
  <p>zkTLS-powered proof generation for verifiable traditional data</p>
</SectionCard>

<SectionCard title="Programmable Attestations" icon="🔌">
  <p>Custom rules and conditional verification for flexible use cases</p>
</SectionCard>

<SectionCard title="Human-Friendly Interface" icon="📱">
  <p>Mobile-first approach with familiar traditional UX</p>
</SectionCard>

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
  border: 1px solid var(--slidev-theme-border);
  border-radius: 6px;
  padding: 0.75rem;
  background: var(--slidev-theme-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--slidev-theme-text-muted);
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
  color: var(--slidev-theme-text-muted);
}
</style>

---

```yaml
layout: default
```

# How ASSAP Works

<div class="workflow-steps">
  <SectionCard title="Proof Generation" icon="1️⃣">
    <p>User connects traditional account and generates zkTLS proof without exposing credentials</p>
  </SectionCard>
  
  <div class="workflow-arrow">→</div>
  
  <SectionCard title="Attestation Creation" icon="2️⃣">
    <p>Verifiable attestation on Solana with programmable permissions</p>
  </SectionCard>
  
  <div class="workflow-arrow">→</div>
  
  <SectionCard title="Verification" icon="3️⃣">
    <p>One-click verification with no complex integration needed</p>
  </SectionCard>
</div>

<GridLayout :columns="3">
  <MetricCard value="73%" label="Reduction in sybil attacks" />
  <MetricCard value="95%" label="Faster onboarding" />
  <MetricCard value="100%" label="Data privacy" />
</GridLayout>

<style>
.workflow-steps {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}

.workflow-steps .section-card {
  flex: 1;
  margin-bottom: 0;
}

.workflow-arrow {
  font-size: 1.5rem;
  margin: 0 1rem;
  color: var(--slidev-theme-text-muted);
}

@media (max-width: 768px) {
  .workflow-steps {
    flex-direction: column;
  }
  
  .workflow-arrow {
    transform: rotate(90deg);
    margin: 0.5rem 0;
  }
}
</style>
