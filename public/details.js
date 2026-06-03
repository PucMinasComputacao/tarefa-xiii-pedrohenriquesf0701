const API_URL = "http://localhost:3000/lutadores";

function mostrarErro(mensagem) {
  var infoContainer = document.getElementById("detalhes-info");
  if (infoContainer) {
    infoContainer.innerHTML =
      '<div class="col-12 py-5 text-center">' +
      '<p style="color: red; font-size: 1.2rem;">⚠ ' + mensagem + '</p>' +
      '<a href="index.html" class="btn-voltar" style="margin-top:16px; display:inline-block;">← Voltar ao Portal</a>' +
      '</div>';
  }
}

function renderizarDetalhes(lutador) {
  document.title = "Portal MMA — " + lutador.nome;

  var infoContainer = document.getElementById("detalhes-info");
  if (infoContainer) {
    var tagsHTML = "";
    if (lutador.tags && lutador.tags.length) {
      tagsHTML = '<div class="tags-wrap" style="margin-bottom:20px;">' +
        lutador.tags.map(function (tag) {
          return '<span class="tag-chip">#' + tag + '</span>';
        }).join("") +
        '</div>';
    }

    infoContainer.innerHTML =
      '<div class="row align-items-center g-4">' +
      '<div class="col-12 col-md-4 text-center">' +
      '<img src="' + lutador.imagem + '" alt="' + lutador.nome + '" class="foto-perfil">' +
      '</div>' +
      '<div class="col-12 col-md-8">' +
      '<span class="detalhe-categoria">' + lutador.categoria + '</span>' +
      '<h1 class="detalhe-nome">' + lutador.nome + '</h1>' +
      '<p class="detalhe-apelido">"' + lutador.apelido + '"</p>' +
      '<p class="detalhe-conteudo">' + lutador.descricaoCompleta + '</p>' +
      tagsHTML +
      '<div class="stats-grid">' +
      '<div class="stat-box"><span class="stat-label">Origem</span><span class="stat-valor">' + lutador.origem + '</span></div>' +
      '<div class="stat-box"><span class="stat-label">Cartel</span><span class="stat-valor">' + lutador.cartel + '</span></div>' +
      '<div class="stat-box"><span class="stat-label">Altura</span><span class="stat-valor">' + lutador.altura + '</span></div>' +
      '<div class="stat-box"><span class="stat-label">Alcance</span><span class="stat-valor">' + lutador.alcance + '</span></div>' +
      '</div>' +
      '<a href="index.html" class="btn-voltar">← Voltar ao Portal</a>' +
      '</div>' +
      '</div>';
  }

  var fotosContainer = document.getElementById("detalhes-fotos");
  if (fotosContainer && lutador.fotos && lutador.fotos.length) {
    var fotosHTML = '';
    lutador.fotos.forEach(function (foto) {
      fotosHTML +=
        '<div class="col-12 col-sm-6 col-md-4">' +
        '<div class="foto-card">' +
        '<img src="' + foto.imagem + '" alt="' + foto.titulo + '" class="foto-img">' +
        '<p class="foto-titulo">' + foto.titulo + '</p>' +
        '</div>' +
        '</div>';
    });
    fotosContainer.innerHTML = fotosHTML;
  }
}

async function init() {
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");

  if (!id) {
    mostrarErro("Nenhum lutador foi selecionado. Volte à página inicial.");
    return;
  }

  try {
    var response = await fetch(API_URL + "/" + id);

    if (!response.ok) {
      mostrarErro("Lutador com id " + id + " não encontrado.");
      return;
    }

    var lutador = await response.json();
    renderizarDetalhes(lutador);

  } catch (error) {
    console.error("Erro ao buscar lutador:", error);
    mostrarErro("Não foi possível conectar ao servidor. Verifique se o JSON Server está rodando.");
  }
}

init();