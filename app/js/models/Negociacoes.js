class Negociacoes {
    constructor() {
        this._negociacoes = [];
    }
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    paraArray() {
        //declarando o tipo no método me garante que a cópia do array q eu criei com o concat vai me devolver um tipo de Array<Negociacao> e não any
        return [].concat(this._negociacoes);
        //programação defensiva, pra não colocarem this._negociacoes.paraArray().length = 0; lá no controller e apagar a porra toda
    }
}
