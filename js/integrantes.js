const MEMBERS = [
  {
    name: "Sérgio Henrique",
    rm: "567254",
    turma: "1TDSPS-2025",
    photo: "sergio.jpg",
    linkedin: "https://www.linkedin.com/in/sergiohenriquessantos/",
    github: "https://github.com/sergiohsantos"
  },
  {
    name: "Andrew Henrique",
    rm: "568405",
    turma: "1TDSPS-2025",
    photo: "andrew.jpg",
    linkedin: "https://www.linkedin.com/in/andrew-henrique-89397a251/",
    github: "https://github.com/AHKSouza"
  },
  {
    name: "Icaro Nascimento",
    rm: "567386",
    turma: "1TDSPS-2025",
    photo: "icaro.jpg",
    linkedin: "https://www.linkedin.com/in/icaronascimento-/",
    github: "https://github.com/IcaroNscS"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("team-grid");
  if (!grid) return;

  grid.innerHTML = "";

  MEMBERS.forEach(m => {
    grid.innerHTML += `
      <article class="team-card">
        <img src="../assets/team/${m.photo}" alt="Foto de ${m.name}">
        <h3>${m.name}</h3>
        <p class="muted">RM: ${m.rm}</p>
        <p class="muted">Turma: ${m.turma}</p>
        <div class="team-links">
          <a href="${m.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${m.github}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </article>`;
  });
});
