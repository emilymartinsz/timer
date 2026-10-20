const timer = document.querySelector('.timer');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
const status = document.querySelector('.status');
const statusTexto = document.querySelector('.status-texto');

let segundos = 0;
let intervalo;

function atualizarStatus(estado, mensagem) {
    status.dataset.state = estado;
    statusTexto.textContent = mensagem;
}

function criarHoraDosSegundos(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    const horasFormatadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormatados = segundosRestantes < 10
        ? `0${segundosRestantes}`
        : segundosRestantes;

    return `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;
}

function iniciarTimer() {
    if (intervalo !== undefined) {
        return;
    }

    intervalo = setInterval(function () {
        segundos++;
        timer.textContent = criarHoraDosSegundos(segundos);
    }, 1000);
    atualizarStatus('executando', 'Timer em andamento');
}

function pausarTimer() {
    if (intervalo === undefined) {
        return;
    }

    clearInterval(intervalo);
    intervalo = undefined;
    atualizarStatus('pausado', 'Timer pausado');
}

function zerarTimer() {
    clearInterval(intervalo);
    intervalo = undefined;
    segundos = 0;
    timer.textContent = '00:00:00';
    atualizarStatus('pronto', 'Pronto para começar');
}

iniciar.addEventListener('click', iniciarTimer);
pausar.addEventListener('click', pausarTimer);
zerar.addEventListener('click', zerarTimer);