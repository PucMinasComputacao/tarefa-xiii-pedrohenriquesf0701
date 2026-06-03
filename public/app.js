const API_URL = "http://localhost:3000/lutadores";

function renderizarSlider(lutadores) {
  var sliderInner = document.getElementById("slider-inner");
  var sliderIndicators = document.getElementById("slider-indicators");
  if (!sliderInner) return;

  var destaques = lutadores.filter(function (l) { return l.destaque; });

  destaques.forEach(function (lutador, index) {
    var li = document.createElement("li");
    li.setAttribute("data-bs-target", "#slider-destaques");
    li.setAttribute("data-bs-slide-to", index);
    if (index === 0) li.classList.add("active");
    sliderIndicators.appendChild(li);

    var item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) item.classList.add("active");

    item.innerHTML =
      '<div class="slider-wrapper">' +
      '<img src="' + lutador.imagem + '" class="slider-img" alt="' + lutador.nome + '">' +
      '<div class="slider-overlay">' +
      '<span class="slider-badge">' + lutador.categoria + '</span>' +
      '<h2 class="slider-nome">' + lutador.nome + '</h2>' +
      '<p class="slider-apelido">"' + lutador.apelido + '"</p>' +
      '<p class="slider-desc">' + lutador.descricaoCurta + '</p>' +
      '<a href="detalhes.html?id=' + lutador.id + '" class="btn-slider">Ver Perfil →</a>' +
      '</div>' +
      '</div>';

    sliderInner.appendChild(item);
  });
}

function createCard(lutador) {
  var col = document.createElement("div");
  col.classList.add("col-12", "col-sm-6", "col-lg-4");

  col.innerHTML =
    '<div class="card-lutador">' +
    '<div class="card-img-wrap">' +
    '<img src="' + lutador.imagem + '" alt="' + lutador.nome + '" class="card-img">' +
    (lutador.destaque ? '<span class="badge-destaque">★ Destaque</span>' : '') +
    '</div>' +
    '<div class="card-body-custom">' +
    '<span class="card-categoria">' + lutador.categoria + '</span>' +
    '<h3 class="card-nome">' + lutador.nome + '</h3>' +
    '<p class="card-apelido">"' + lutador.apelido + '"</p>' +
    '<p class="card-cartel"><strong>Cartel:</strong> ' + lutador.cartel + '</p>' +
    '<p class="card-desc">' + lutador.descricaoCurta + '</p>' +
    '<a href="detalhes.html?id=' + lutador.id + '" class="btn-card">Ver Perfil Completo</a>' +
    '</div>' +
    '</div>';

  return col;
}

function renderCards(lutadores) {
  var container = document.getElementById("cards-container");
  if (!container) return;
  container.innerHTML = "";
  lutadores.forEach(function (lutador) {
    container.appendChild(createCard(lutador));
  });
}

async function fetchItems() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar dados: " + response.status);
  return await response.json();
}

async function init() {
  try {
    const lutadores = await fetchItems();
    renderizarSlider(lutadores);
    renderCards(lutadores);
  } catch (error) {
    console.error("Falha ao carregar lutadores:", error);
    var container = document.getElementById("cards-container");
    if (container) {
      container.innerHTML =
        '<div class="col-12"><div class="alert alert-danger text-center">' +
        '<strong>Erro ao carregar lutadores.</strong><br>' +
        'Verifique se o JSON Server está rodando em <code>http://localhost:3000</code>' +
        '</div></div>';
    }
  }
}

if (document.getElementById("cards-container")) {
  init();
}