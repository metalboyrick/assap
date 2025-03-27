---
transition: null
layout: default
class: team-slide dark
---

# 👥 Our Team

<div class="team-container">
  <div class="team-content">
    <div class="why-us">
      <h3>Why Us?</h3>
      <ul>
        <li>Experience with building for large corporations and felt pain points in regards to paperwork</li>
        <li>Proven attestation protocol builders</li>
      </ul>
    </div>

<div class="team-members">
  <TeamMember
    initial="R"
    name="Richard"
    position="Lead"
    :bio="[
      'Tsinghua CS Alumni',
      'ETHGlobal Bangkok Sign Protocol Winner',
      'Based SEA Winner',
      'Ex-Tokopedia, MON Protocol'
    ]"
  />

<TeamMember
    initial="F"
    name="Farrel"
    position="Fullstack Engineer"
    :bio="[
      'Worked with TACO and other major Indonesian corporations',
      'Expert in building scalable applications'
    ]"
  />

</div>
  </div>
</div>

<style>
.dark {
  background-color: #1a1a1a;
  color: #eee;
}

.team-slide {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.team-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: flex-start;
}

.team-content {
  max-width: 900px;
  width: 100%;
}

.why-us {
  background: rgba(80, 80, 80, 0.2);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #ffffff;
  margin-bottom: 2rem;
}

.why-us h3 {
  margin-top: 0;
  color: #fff;
}

.why-us ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #bbb;
}

.team-members {
  display: flex;
  gap: 2rem;
  align-items: stretch;
}
</style>
