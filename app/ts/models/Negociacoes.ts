import { Negociacao } from './Negociacao';

export class Negociacoes {
    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void{ //declarei como void por uma questão de boa práitca colocar tipo nos métodos
        this._negociacoes.push(negociacao);
    }

    paraArray(): Array<Negociacao>{ //um método que retorna o array de negociações
                                    //declarando o tipo no método me garante que a cópia do array q eu criei com o concat vai me devolver um tipo de Array<Negociacao> e não any
        //(original)
        //return [].concat(this._negociacoes);
        //programação defensiva, pra não colocarem this._negociacoes.paraArray().length = 0; lá no controller e apagar a porra toda

        return ([] as Negociacao[]).concat(this._negociacoes);

        // como temos agora o '"strictNullChecks": true' em tsconfig.json q bloqueia atribuir valores null, do jeito que tava 'return [].concat(this._negociacoes);' o primeiro colchete indica que ele poderia receber um valor null ali dentro. Colocando dessa forma 'return ([] as Negociacao[]).concat(this._negociacoes);' definindo já o array como tipo Negociacao, esse problema é resolvido.

    }

    paraTexto(): void {

        console.log('-- paraTexto --');
        console.log(JSON.stringify(this._negociacoes)); //JSON.stringfy serve para transformar objetos JavaScript para string
    }

}