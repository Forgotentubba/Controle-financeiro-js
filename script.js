const form = document.getElementById("form-gasto");
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const dataInput = document.getElementById("data");
const tipoInput = document.getElementById("tipo");

const listaGastos = document.getElementById("lista-gastos");

const totalEntradaSpan = document.getElementById("total-entrada");
const totalSaidaSpan = document.getElementById("total-saida");
const saldoSpan = document.getElementById("saldo");

const ctx = document.getElementById("graficoMensal").getContext("2d");

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
let grafico = null;

document.addEventListener("DOMContentLoaded", () => {
    atualizarAno();
    atualizarAplicacao();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    adicionarGasto();
});

function atualizarAplicacao() {
    atualizarLista();
    atualizarResumo();
    atualizarGrafico();
}

function adicionarGasto() {
    const descricao = descricaoInput.value.trim();
    const valor = parseFloat(valorInput.value);
    const data = dataInput.value;
    const tipo = tipoInput.value;

    if (!descricao || !valor || !data || !tipo) return;

    const novoGasto = {
        id: Date.now(),
        descricao,
        valor,
        data,
        tipo
    };

    gastos.push(novoGasto);

    salvarNoLocalStorage();
    atualizarAplicacao();
    form.reset();
}

function removerGasto(id) {
    gastos = gastos.filter(gasto => gasto.id !== id);
    salvarNoLocalStorage();
    atualizarAplicacao();
}

function atualizarLista() {
    listaGastos.innerHTML = "";

    gastos.forEach(gasto => {
        const li = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent = `${gasto.descricao} - R$ ${gasto.valor.toFixed(2)} - ${gasto.data}`;
        texto.style.color = gasto.tipo === "entrada" ? "green" : "red";

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "❌";
        botaoExcluir.addEventListener("click", () => removerGasto(gasto.id));

        li.appendChild(texto);
        li.appendChild(botaoExcluir);
        listaGastos.appendChild(li);
    });
}

function atualizarResumo() {
    let totalEntrada = 0;
    let totalSaida = 0;

    gastos.forEach(gasto => {
        if (gasto.tipo === "entrada") {
            totalEntrada += gasto.valor;
        } else {
            totalSaida += gasto.valor;
        }
    });

    const saldo = totalEntrada - totalSaida;

    totalEntradaSpan.textContent = totalEntrada.toFixed(2);
    totalSaidaSpan.textContent = totalSaida.toFixed(2);
    saldoSpan.textContent = saldo.toFixed(2);
    saldoSpan.style.color = saldo >= 0 ? "green" : "red";
}

function atualizarGrafico() {
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    let totalEntrada = 0;
    let totalSaida = 0;

    gastos.forEach(gasto => {
        const dataGasto = new Date(gasto.data + "T00:00:00");

        if (
            dataGasto.getMonth() === mesAtual &&
            dataGasto.getFullYear() === anoAtual
        ) {
            if (gasto.tipo === "entrada") {
                totalEntrada += gasto.valor;
            } else {
                totalSaida += gasto.valor;
            }
        }
    });

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Entradas", "Saídas"],
            datasets: [{
                label: "Total do Mês",
                data: [totalEntrada, totalSaida],
                backgroundColor: ["#4caf50", "#f44336"]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function salvarNoLocalStorage() {
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

function atualizarAno() {
    document.getElementById("ano").textContent = new Date().getFullYear();
}
