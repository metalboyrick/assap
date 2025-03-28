---
transition: null
layout: default
---

# 👥 Our Team

<SectionCard title="Why Us?" :highlighted="true">
  <ul>
    <li>Experience with building for large corporations and felt pain points in regards to paperwork</li>
    <li>Proven attestation protocol builders</li>
  </ul>
</SectionCard>

<GridLayout :columns="2">
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
</GridLayout>
