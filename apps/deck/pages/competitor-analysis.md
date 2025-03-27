---
layout: default
---

# Existing protocols exist, let's see where we stand

<div class="competitor-table">
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Chain Support</th>
        <th>Programmable Attestations</th>
        <th>Mobile Support</th>
        <th>Sybil Protection</th>
      </tr>
    </thead>
    <tbody>
      <tr class="highlighted-row">
        <td>ASSAP</td>
        <td>Solana</td>
        <td>Advanced</td>
        <td>Full Support</td>
        <td>Comprehensive</td>
      </tr>
      <tr>
        <td>Ethereum Attestation Service</td>
        <td>EVM</td>
        <td>Onchain and Offchain attestations with custom resolvers</td>
        <td>Partial</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Sign Protocol</td>
        <td>EVM, Solana, Starknet</td>
        <td>Moderate</td>
        <td>Web-only</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Attest Protocol</td>
        <td>Solana, Starknet, Stellar</td>
        <td>Basic</td>
        <td>Limited</td>
        <td>None</td>
      </tr>
      <tr>
        <td>Gitcoin Passport</td>
        <td>EVM</td>
        <td>Identity-focused</td>
        <td>Responsive</td>
        <td>Web2 Credentials</td>
      </tr>
      <tr>
        <td>World ID</td>
        <td>World Chain</td>
        <td>Identity-focused</td>
        <td>Progressive</td>
        <td>Proof of Humanity</td>
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
  background-color: #000000;
  font-size: 0.8rem;
}

.competitor-table th {
  background-color: #333333;
  color: white;
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
  border-bottom: 1px solid #333333;
  text-align: center;
  color: #ffffff;
}

.competitor-table td:first-child {
  font-weight: 700;
  text-align: left;
}

.highlighted-row {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-left: 4px solid #ffffff;
}

.highlighted-row td {
  font-weight: 500;
}

.highlighted-row td:first-child {
  color: #ffffff;
  font-weight: 700;
}

@media (max-width: 768px) {
  .competitor-table table {
    font-size: 0.8rem;
  }
  
  .competitor-table th,
  .competitor-table td {
    padding: 0.5rem;
  }
}
</style>
