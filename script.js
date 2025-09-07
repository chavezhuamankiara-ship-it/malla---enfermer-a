// =====================
// Datos de la malla
// =====================
const PLAN = [
  {
    ciclo: "I",
    cursos: [
      { code: "055106101", name: "Anatomía y Fisiología I", credits: 3, prereqs: [] },
      { code: "055106102", name: "Biología Celular y Molecular", credits: 3, prereqs: [] },
      { code: "055106103", name: "Ciencias Sociales Aplicadas a la Salud", credits: 3, prereqs: [] },
      { code: "055106104", name: "Matemáticas", credits: 3, prereqs: [] },
      { code: "055106105", name: "Psicología Evolutiva", credits: 3, prereqs: [] },
      { code: "055106106", name: "Química y Bioquímica", credits: 3, prereqs: [] },
      { code: "055106107", name: "Introducción a la Enfermería y Epistemología", credits: 4, prereqs: [] },
    ]
  },
  {
    ciclo: "II",
    cursos: [
      { code: "055106150", name: "Anatomía y Fisiología II", credits: 4, prereqs: ["055106101"] },
      { code: "055106151", name: "Redacción y Habilidades Comunicativas en Salud", credits: 4, prereqs: [] },
      { code: "055106152", name: "Metodología de la Investigación", credits: 4, prereqs: [] },
      { code: "055106153", name: "Microbiología y Parasitología", credits: 3, prereqs: ["055106102"] },
      { code: "055106154", name: "Ética y Valores en Enfermería", credits: 3, prereqs: ["055106107"] },
      { code: "055106155", name: "Farmacología Aplicada a la Enfermería", credits: 3, prereqs: ["055106106"] },
      { code: "055106156", name: "Inglés I", credits: 2, prereqs: [] }
    ]
  }
  // 👉 Puedes seguir pegando los demás ciclos igual que en el plan
];

// =====================
// Renderizar malla
// =====================
const contenedor = document.getElementById("malla");
const panel = document.getElementById("panel");
const filtroCiclo = document.getElementById("filtroCiclo");
const inputBusqueda = document.getElementById("busqueda");

// llenar select de ciclos
PLAN.forEach(b => {
  const opt = document.createElement("option");
  opt.value = b.ciclo;
  opt.textContent = `Ciclo ${b.ciclo}`;
  filtroCiclo.appendChild(opt);
});

function renderMalla() {
  const filtro = filtroCiclo.value;
  const query = inputBusqueda.value.toLowerCase();

  contenedor.innerHTML = "";

  PLAN.filter(b => !filtro || b.ciclo === filtro).forEach(bloque => {
    const sec = document.createElement("section");
    sec.innerHTML = `<h2>Ciclo ${bloque.ciclo}</h2>`;
    bloque.cursos
      .filter(c => c.name.toLowerCase().includes(query) || c.code.includes(query))
      .forEach(curso => {
        const card = document.createElement("div");
        card.className = "card fade-in";
        card.innerHTML = `
          <div class="pill pill-gray">${curso.credits} cr</div>
          <span class="code">${curso.code}</span>
          <h3>${curso.name}</h3>
          <small>${curso.prereqs.length ? "Prereqs: " + curso.prereqs.join(", ") : "Sin prereqs"}</small>
        `;
        card.onclick = () => abrirPanel(curso);
        sec.appendChild(card);
      });
    contenedor.appendChild(sec);
  });
}

function abrirPanel(curso) {
  panel.classList.remove("hidden");
  panel.innerHTML = `
    <button class="btn btn-secondary" onclick="cerrarPanel()">Cerrar</button>
    <h2>${curso.name}</h2>
    <p><strong>Código:</strong> ${curso.code}</p>
    <p><strong>Créditos:</strong> ${curso.credits}</p>
    <p><strong>Prerequisitos:</strong> ${curso.prereqs.length ? curso.prereqs.join(", ") : "Ninguno"}</p>
  `;
}

function cerrarPanel() {
  panel.classList.add("hidden");
}

inputBusqueda.addEventListener("input", renderMalla);
filtroCiclo.addEventListener("change", renderMalla);

renderMalla();
