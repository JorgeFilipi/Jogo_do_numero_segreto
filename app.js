
let listaDeNumerosSorteados = [];
let numeroLimiti = 10;
let numeroSecreto = gerarNumeroAleatorio();
let numeroChute = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimiti}`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    let plural = (numeroChute == 1) ? "tentativa" : "tentativas";
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'ACERTOU!');
        exibirTextoNaTela('p', `Parabéns! Você descobriu o número secreto com ${numeroChute} ${plural}`);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        numeroChute++;
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p',  'O número secreto é menor');
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior');
        }
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEcolhido = parseInt(Math.random() * numeroLimiti + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimiti){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEcolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEcolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEcolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    numeroChute = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}