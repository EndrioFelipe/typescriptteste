//namespace Views { //namespace é pra quando vc quiser visualizar rapidamente quais são as views do seu projeto, ao digitar 'Views.' pra já ir mostrando quais são as classes View
export abstract class View <T>{ //é preciso trabalhar com tipos genéricos, pq tanto NegociacoesView quanto MensagemView vão receber tipos diferentes como parâmetros em sues métodos herdados
                                //A palavra chave 'export' serve para disponibilizar a classe ao digitar Views. e ela aparece depois do ponto
                    
    protected _elemento: JQuery;

    constructor(seletor: string) {

        this._elemento = $(seletor);
    }

    update(modelo: T): void{
        this._elemento.html(this.template(modelo));
    }

    //sfas

    abstract template(modelo: T): string;
}




