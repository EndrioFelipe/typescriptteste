import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { Negociacoes } from '../models/Negociacoes';
import { Negociacao } from '../models/Negociacao';

//procure na aula 01 vídeo 07 caso queira deixar esses imports mais enxutos

export class NegociacaoController {
    private _inputData: JQuery;
    private _inputQuantidade: JQuery;
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes(); //Não precisa colocar ': Negociacoes' pq o typescript já infere q é do tipo Negociacoes após colocar o new
    private _negociacoesView = new NegociacoesView('#negociacoesView', true); //esse Views na frente é por causa do namespace. Ver classe 'View'.
    private _mensagemView = new MensagemView('#mensagemView', true); //depois do seletor, o construtor pede outro parâmetro q é o boolean pedind pra informar se vc quer escapar ou não do filtro q impede de adicionar novas tags <script> no template. Coloca-se true pq vc quer escapar.

    constructor(){
        // a conversão <HTMLInputElement> é necessária pq ele é um tipo mais específico em relação ao 
        //tipo Elemento recebido pelo document.querySelector
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event){ //tem que declarar que é do tipo Event quando '"noImplicitAny": true' em tsconfig, pq se não ele recebe um tipo implícito 'any'
        event.preventDefault();
        //declarar os inputs como element não habilita o .value, pra isso é preciso usar o 
        //HTMLInputElement

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(data.getDay() == DiaDaSemana.Domingo || data.getDay() == DiaDaSemana.Sabado){
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return 
        }

        const negociacao = new Negociacao(data, //aqui o input recebe no formato String e Date até aceita o formato String, mas ela recebe tipo 2012-05-01 e ela deveria ser 2012,05,01. Então o replace troca os hífens por vírgulas
                                          parseInt(this._inputQuantidade.val()),
                                          parseFloat(this._inputValor.val()));
        console.log(negociacao);

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);//passa a lisa de negociacoes

        //feito os testes de integridade do array, o código abaixo torna-se inutilizável
        // this._negociacoes.paraArray().forEach(negociacao => {
        //     console.log("data: "+negociacao.data);
        // });

        this._mensagemView.update('Negociação adicionada com sucesso!');
    }
}

enum DiaDaSemana {

    Domingo, 
    Segunda, 
    Terca, 
    Quarta, 
    Quinta, 
    Sexta, 
    Sabado
}