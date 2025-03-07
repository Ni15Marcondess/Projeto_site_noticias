function toggleTheme() {
    const body = document.body;

    //Alterna a classe do tema
    body.classList.toggle("light-theme");

    // verifica qual tema está ativo e salva no localStorage
    if (body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
}

//mantém a escolha do usuário ao recarregar a página
window.onload = function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }
};

//carrega mais noticias quando o usuário desce a página
let page = 1;

window.addEventListener("scroll", function() {
    if (window.innerHeight + window.scrollY >= this.document.body.offsetHeight - 100) {
        carregarMaisNoticias();
    }
});

function carregarMaisNoticias() {
    let container = document.querySelector(".outras-noticias");

    for (let i = 0; i < 3; i++) {
        let noticia = document.createElement("div");
        noticia.className = "noticia-item";
        noticia.innerHTML = `
            <img src="./imagem/wallpaper.jpg" alt="Nova Notícia">
            <h3>Notícia Gerada ${page}</h3>
            <p>Esta é uma notícia gerada automaticamente.</p> `;
        container.appendChild(noticia);
    }

    page++;
}