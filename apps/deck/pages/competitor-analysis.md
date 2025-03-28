---
layout: default
---

# ⚔️ Competitive Analysis

<div class="competitor-table">
  <table>
    <thead>
      <tr>
        <th>Protocol</th>
        <th>Sybil Resistance</th>
        <th>Composability</th>
        <th>Reading the attestations</th>
      </tr>
    </thead>
    <tbody>
      <tr class="highlight">
        <td>ASSAP</td>
        <td>Native anti-sybil protection</td>
        <td>Human-only composable protocol</td>
        <td>Readable Explorers</td>
      </tr>
      <tr>
        <td>Ethereum Attestation Service</td>
        <td>No built-in protection</td>
        <td>General-purpose protocol</td>
        <td>EASScan</td>
      </tr>
      <tr>
        <td>Sign Protocol (EthSign)</td>
        <td>No built-in protection</td>
        <td>General-purpose protocol</td>
        <td>Sign Explorer</td>
      </tr>
      <tr>
        <td>Attest Protocol</td>
        <td>No built-in protection</td>
        <td>General-purpose protocol</td>
        <td>Attestation Explorer</td>
      </tr>
      <tr>
        <td>Gitcoin Passport</td>
        <td>Traditional credentials</td>
        <td>Identity only</td>
        <td>Block Explorer</td>
      </tr>
      <tr>
        <td>World ID</td>
        <td>Proof of humanity</td>
        <td>Identity only</td>
        <td>Through mobile app</td>
      </tr>
    </tbody>

  </table>
</div>

<style>
.competitor-table {
  width: 100%;
  margin-top: 2rem;
  max-width: 100%;
  overflow-x: auto;
}

.competitor-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--slidev-theme-background);
  font-size: 0.8rem;
}

.competitor-table th {
  background-color: var(--slidev-theme-border);
  color: var(--slidev-theme-text);
  font-weight: 600;
  padding: 0.75rem;
  text-align: center;
  white-space: nowrap;
}

.competitor-table th:first-child {
  text-align: left;
  width: 20%;
}

.competitor-table td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--slidev-theme-border);
  text-align: center;
  color: var(--slidev-theme-text);
}

.competitor-table td:first-child {
  font-weight: 700;
  text-align: left;
}

.competitor-table tr.highlight {
  background-color: var(--slidev-theme-highlight);
}

.competitor-table tr.highlight td {
  font-weight: 500;
}

@media (max-width: 768px) {
  .competitor-table table {
    font-size: 0.7rem;
  }
  
  .competitor-table th,
  .competitor-table td {
    padding: 0.5rem;
  }
}
</style>
