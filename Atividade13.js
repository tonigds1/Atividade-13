// Crie gráficos de pizza (pizza charts)
function createCharts() {
    const data1 = {
        labels: ['Conta Bancária', 'Conta Corrente', 'Conta Poupança', 'Conta Universitária'],
        datasets: [{
            data: [30, 20, 25, 15],
            backgroundColor: ['#FF5733', '#3366FF', '#33FF57', '#FF33E5'],
        }],
    };

    const data2 = {
        labels: ['Conta Corrente', 'Conta Poupança'],
        datasets: [{
            data: [70, 30],
            backgroundColor: ['#3366FF', '#33FF57'],
        }],
    };

    const data3 = {
        labels: ['Conta Bancária', 'Conta Corrente', 'Conta Poupança'],
        datasets: [{
            data: [40, 25, 35],
            backgroundColor: ['#FF5733', '#3366FF', '#33FF57'],
        }],
    };

    const options = {
        responsive: false, // Não permitir redimensionamento responsivo
    };

    // Renderize os gráficos
    new Chart(document.getElementById('chart1'), {
        type: 'pie',
        data: data1,
        options: options,
    });

    new Chart(document.getElementById('chart2'), {
        type: 'pie',
        data: data2,
        options: options,
    });

    new Chart(document.getElementById('chart3'), {
        type: 'pie',
        data: data3,
        options: options,
    });
}

// Array para armazenar contas
const contas = [];

// Função para criar uma conta com base nas entradas do formulário
function criarConta() {
    const agencia = document.getElementById("agencia").value;
    const numero = document.getElementById("numero").value;
    const tipoConta = document.getElementById("tipoConta").value;
    const cartaoCredito = document.getElementById("cartaoCredito").value;

    let novaConta;

    if (tipoConta === "ContaCorrente") {
        novaConta = new ContaCorrente(agencia, numero, 0, cartaoCredito);
    } else if (tipoConta === "ContaPoupanca") {
        novaConta = new ContaPoupanca(agencia, numero, 0);
    } else if (tipoConta === "ContaUniversitaria") {
        novaConta = new ContaUniversitaria(agencia, numero, 0);
    } else {
        novaConta = new ContaBancaria(agencia, numero, "ContaBancaria", 0);
    }

    // Adicione a nova conta ao array
    contas.push(novaConta);

    // Limpe os campos do formulário
    document.getElementById("agencia").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("cartaoCredito").value = "";

    // Atualize os gráficos
    createCharts();
}

// Função para executar uma operação em uma conta existente
function executarOperacao() {
    const operacao = document.getElementById("operacao").value;
    const valor = parseFloat(document.getElementById("valor").value);

    // Suponha que você tenha uma lista de contas e deseja operar na primeira conta (índice 0)
    const conta = contas[0];

    if (operacao === "sacar") {
        const saque = conta.sacar(valor);
        if (saque > 0) {
            document.getElementById("mensagem").textContent = `Saque de ${saque} realizado com sucesso.`;
        } else {
            document.getElementById("mensagem").textContent = "Saldo insuficiente para saque.";
        }
    } else if (operacao === "depositar") {
        const saldoAtual = conta.depositar(valor);
        document.getElementById("mensagem").textContent = `Depósito realizado. Saldo atual: ${saldoAtual}`;
    }

    // Limpe o campo de valor do formulário
    document.getElementById("valor").value = "";

    // Atualize os gráficos
    createCharts();
}

// Chame a função para criar os gráficos quando a página for carregada
createCharts();
