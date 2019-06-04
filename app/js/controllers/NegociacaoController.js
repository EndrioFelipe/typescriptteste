class NegociacaoController {
    constructor() {
        // a conversão <HTMLInputElement> é necessária pq ele é um tipo mais específico em relação ao 
        //tipo Elemento recebido pelo document.querySelector
        this._inputData = document.querySelector("#data");
        this._inputQuantidade = document.querySelector("#quantidade");
        this._inputValor = document.querySelector("#valor");
    }
    adiciona(event) {
        event.preventDefault();
        //declarar os inputs como element não habilita o .value, pra isso é preciso usar o 
        //HTMLInputElement
        const negociacao = new Negociacao(new Date(this._inputData.value.replace(/-/g, ',')), //aqui o input recebe no formato String e Date até aceita o formato String, mas ela recebe tipo 2012-05-01 e ela deveria ser 2012,05,01. Então o replace troca os hífens por vírgulas
        parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        console.log(negociacao);
    }
}
