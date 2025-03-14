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
let maxNoticias = 28;
let noticiasCriadas = 0;

window.addEventListener("scroll", function() {
    if (window.innerHeight + window.scrollY >= this.document.body.offsetHeight - 100) {
        if (noticiasCriadas < maxNoticias) {
            carregarMaisNoticias();
        }
    }
});

function carregarMaisNoticias() {
    let container = document.querySelector(".outras-noticias");

    for (let i = 0; i < 3; i++) {
        if (noticiasCriadas >= maxNoticias) return; //para a execução se atingir o limite

        let noticia = document.createElement("div");
        noticia.className = "noticia-item";
        noticia.innerHTML = `
            <img src="./imagem/wallpaper.jpg" alt="Nova Notícia">
            <h3>Notícia Gerada ${page}</h3>
            <p>Esta é uma notícia gerada automaticamente.</p> `;

        container.appendChild(noticia);
        noticiasCriadas++;
    }
}

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        let targetId = this.getAttribute("href").subtring(1);
        let targetElement = document.getElementById(targetId);

        if(targetElement) {
            window.scrollTo ({
                top: targetElement.offsettop - 60,
                behavior: "smooth"
            });
        }
    });
});

// Lógica do marcador que o usuário pega e arrasta
 const marcador = document.getElementById("marcador");

 //verifica se já tem posição salva no LocalStorage
if (localStorage.getItem("marcadorPos")) {
    let pos = JSON.parse(localStorage.getItem("marcadorPos"));
    marcador.style.left = pos.x + "px";
    marcador.style.top = pos.y + "px";
}

//evento pra salvar a posição de leitura
marcador.addEventListener("click", () => {
    localStorage.setItem("posicaoLeitura", window.scrollY);
    alert("Posição de leitura salva!");
});

//função pra arrastar o marcador 
marcador.addEventListener("mousedown", (event) => {
    let shiftX = event.clientX - marcador.getBoundingClientRect().left;
    let shiftY = event.clientY - marcador.getBoundingClientRect().top;
    
    function moveAt(pageX, pageY) {
        marcador.style.left = pageX - shiftX + "px";
        marcador.style.top = pageY - shiftY +"px";
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    marcador.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onMouseMove);

        //salvar a posição do marcador no localStorage
        localStorage.setItem("marcadorPos", JSON. stringify({
            x: marcador.offsetLeft,
            y: marcador.offsetTop
        }));
    }, {once: true});
});

marcador.ondragstart = () => false; //evita comportamento padrão de arrastar elemento

//botão de reset do marcador 
document.getElementById("resetMarcador").addEventListener("click", () => {
    const marcador = document.getElementById("marcador");

    // Define a posição inicial
    marcador.style.left = "95%";
    marcador.style.top = "50%";

    // Remove a posição salva no localStorage
    localStorage.removeItem("marcadorPos");
});


//código das particulas do site
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.7,
            "random": false
        },
        "size": {
            "value": 3,
            "random": true
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out"
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            }
        },
        "modes": {
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            }
        }
    }
});


particlesJS.load('particles-js', 'js/particles-config.json', function() {
    console.log('Particles.js carregado com sucesso!');
});

function ajustarAlturaParticles() {
    let alturaTotal = document.body.scrollHeight;
    document.getElementById("particles-js").style.height = alturaTotal + "px";
}

window.onload = ajustarAlturaParticles;
window.onresize = ajustarAlturaParticles;
