class ContaBancaria {
    constructor(agencia, numero, tipo='ContaBancaria', saldo=0) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this._saldo = saldo;
    }

    get saldo() {
        return this._saldo;
    }

    set saldo(novoSaldo) {
        this._saldo = novoSaldo;
    }

    sacar(valor) {
        if (valor <= this._saldo) {
            this._saldo -= valor;
            return valor;
        } else {
            console.log('Saldo insuficiente');
            return 0;
        }
    }

    depositar(valor) {
        this._saldo += valor;
        return this._saldo;
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, 'ContaCorrente', saldo);
        this.cartaoCredito = cartaoCredito;
    }

    get cartaoCredito() {
        return this._cartaoCredito;
    }

    set cartaoCredito(valor) {
        this._cartaoCredito = valor;
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, 'ContaPoupanca', saldo);
    }
}

class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, 'ContaUniversitaria', saldo);
    }

    sacar(valor) {
        if (valor > 500) {
            console.log('Saque acima de 500 reais não permitido para ContaUniversitaria');
            return 0;
        }
        return super.sacar(valor);
    }
}
