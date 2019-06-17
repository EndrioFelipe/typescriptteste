class View <T>{ //é preciso trabalhar com tipos genéricos, pq tanto NegociacoesView quanto MensagemView vão receber tipos diferentes como parâmetros em sues métodos herdados
    protected _elemento: Element;

    constructor(seletor: string) {

        this._elemento = document.querySelector(seletor);
    }

    update(modelo: T): void{
        this._elemento.innerHTML = this.template(modelo);
    }

    template(modelo: T): string {
        throw new Error('você deve implementar o método template');
    }
}