abstract class View <T>{ //é preciso trabalhar com tipos genéricos, pq tanto NegociacoesView quanto MensagemView vão receber tipos diferentes como parâmetros em sues métodos herdados
                        
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