let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
const palavras = [
    {
        nome: "ARARIPE",
        categoria: "CIDADE"
    },
    {
        nome: "BREJINHO",
        categoria: "DISTRITO"
    },
    {
        nome: "RIACHOGRANDE",
        categoria: "DISTRITO"
    },
    {
        nome: "ALAGOINHA",
        categoria: "DISTRITO"
    },
    {
        nome: "PAJEU",
        categoria: "DISTRITO"
    },
    {
        nome: "SANTOANTONIO",
        categoria: "PADROEIRO"
    },
    {
        nome: "CASADEPITIA",
        categoria: "PATRIMONIO"
    },
    {
        nome: "PREFEITURA",
        categoria: "PATRIMONIO"
    },
    {
        nome: "CICEROFERREIRA",
        categoria: "PREFEITO"
    },
    {
        nome: "RAIMUNDOELESBAO",
        categoria: "AUTOR DO HINO"
    },
    {
        nome: "BREJOSECO",
        categoria: "PRIMEIRO NOME"
    },
    {
        nome: "FEQUARIPE",
        categoria: "FESTIVAL DE QUADRILHA"
    },
    {
        nome: "SOLDADINHODOARARIPE",
        categoria: "AVE EM INSTINÇÃO"
    },

]


palavra = document.getElementById('#palavraSecreta')
criarPalavraSecreta()

function criarPalavraSecreta() {
    const indexPalavra = parseInt(Math.random() * palavras.length)
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
}

palavraTela();

function palavraTela() {
    const categoria = document.getElementById('categoria');
    categoria.innerHTML = palavraSecretaCategoria
    const palavra = document.getElementById('palavraSecreta');
    palavra.innerHTML = '';

    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] === undefined) {
            listaDinamica[i] = '&nbsp'
            palavra.innerHTML = palavra.innerHTML + "<div class = 'letras'>" + listaDinamica[i] + "</div>"

        } else {
            palavra.innerHTML = palavra.innerHTML + "<div class = 'letras'>" + listaDinamica[i] + "</div>"
        }

    }

}

let VerificarLetraEscolhida = letra => {

    document.getElementById('tecla ' + letra).disabled = true;
    if (tentativas > 0) {
        mudarStyleLetra('tecla ' + letra);
        comparaListas(letra);
        palavraTela()
    }
};

function mudarStyleLetra(tecla) {
    document.getElementById(tecla).style.background = '#05fafa';
    document.getElementById(tecla).style.color = '#6a6969';
}


function comparaListas(letra) {

    const posicao = palavraSecretaSorteada.indexOf(letra)
    if (posicao < 0) {
        tentativas--
        imagemForca()
        if (tentativas === 0) {
            abreModal('VOCÊ NÃO CONSEGUIU', 'A palavra escondida era <br/>' + palavraSecretaSorteada)
        }

    } else {
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] === letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] !== listaDinamica[i]) {
            vitoria = false;
        }
    }
    if (vitoria === true) {
        abreModal('MUITO BEM!', 'Você conseguiu adivinhar a palavra escondida. <br/>')
        tentativas = 0;
    }

    function imagemForca() {
        document.getElementById('img').src = `./imagem/forca${6 - tentativas}.png`
    }

    function abreModal(titulo, mensagem) {

        let modalTitle = document.getElementById('titulo');
        modalTitle.innerText = titulo;

        let modalMessage = document.getElementById('texto');
        modalMessage.innerHTML = mensagem

        $('#myModal').modal({
            show: true
        });
    }

    let btnRestart = document.querySelector('#btnRestart')

    btnRestart.addEventListener('click', function () {
        location.reload();
    })
}

window.addEventListener('keydown', (e) => {

    if (e.key.toLowerCase() === 'a' ||
        e.key.toLowerCase() === 'b' ||
        e.key.toLowerCase() === 'c' ||
        e.key.toLowerCase() === 'd' ||
        e.key.toLowerCase() === 'e' ||
        e.key.toLowerCase() === 'f' ||
        e.key.toLowerCase() === 'g' ||
        e.key.toLowerCase() === 'h' ||
        e.key.toLowerCase() === 'i' ||
        e.key.toLowerCase() === 'j' ||
        e.key.toLowerCase() === 'k' ||
        e.key.toLowerCase() === 'l' ||
        e.key.toLowerCase() === 'm' ||
        e.key.toLowerCase() === 'n' ||
        e.key.toLowerCase() === 'o' ||
        e.key.toLowerCase() === 'p' ||
        e.key.toLowerCase() === 'q' ||
        e.key.toLowerCase() === 'r' ||
        e.key.toLowerCase() === 's' ||
        e.key.toLowerCase() === 't' ||
        e.key.toLowerCase() === 'u' ||
        e.key.toLowerCase() === 'v' ||
        e.key.toLowerCase() === 'w' ||
        e.key.toLowerCase() === 'x' ||
        e.key.toLowerCase() === 'y' ||
        e.key.toLowerCase() === 'z') {

        VerificarLetraEscolhida(e.key.toUpperCase());
    }
})