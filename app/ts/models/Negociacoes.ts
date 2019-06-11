class Negociacoes {
    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void{ //declarei como void por uma questão de boa práitca colocar tipo nos métodos
        this._negociacoes.push(negociacao);
    }

    paraArray(): Array<Negociacao>{ //um método que retorna o array de negociações
                                    //declarando o tipo no método me garante que a cópia do array q eu criei com o concat vai me devolver um tipo de Array<Negociacao> e não any
        return [].concat(this._negociacoes);
        //programação defensiva, pra não colocarem this._negociacoes.paraArray().length = 0; lá no controller e apagar a porra toda
    }



}