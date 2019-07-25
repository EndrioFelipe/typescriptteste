//namespace Views { //namespace é pra quando vc quiser visualizar rapidamente quais são as views do seu projeto, ao digitar 'Views.' pra já ir mostrando quais são as classes View
export abstract class View <T>{ //é preciso trabalhar com tipos genéricos, pq tanto NegociacoesView quanto MensagemView vão receber tipos diferentes como parâmetros em sues métodos herdados
                                //A palavra chave 'export' serve para disponibilizar a classe ao digitar Views. e ela aparece depois do ponto
                    
    protected _elemento: JQuery;
    private _escapar: boolean;

    constructor(seletor: string, escapar: boolean) {

        this._elemento = $(seletor);
        this._escapar = escapar;
    }

    update(modelo: T): void{
        let template = this.template(modelo);
        if(this._escapar) 
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');//procura qualquer incidência de uma teg script e troca por uma string em branco

        // this._elemento.html(this.template(modelo));
        this._elemento.html(template);
    }

    

    abstract template(modelo: T): string;
}




