let listaDeNumerosSorteados = []
let tentativas = 1
const numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio ();

function exibirTextoNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicio() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número de 1 à ${numeroMaximo}`);
}

mensagemInicio ()

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você adivinhou o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas) ;
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p', 'O número é menor.');
        } else {
            exibirTextoNaTela ('p', 'O número é maior.');
        }
        tentativas++
        limparCampo ();
    }
}

function gerarNumeroAleatorio () {
    let numeroSorteado = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeElementosNaLista == numeroMaximo) {
        listaDeNumerosSorteados = []
    }
    if (listaDeNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    mensagemInicio();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    tentativas = 1
}
