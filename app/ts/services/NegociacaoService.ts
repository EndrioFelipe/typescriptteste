import { Negociacao } from '../models/Negociacao';
import { NegociacaoParcial } from '../models/NegociacaoParcial';

export class NegociacaoService{

    obterNegociacoes(handler: HandlerFunction): Promise <Negociacao[]> { //esse 'Function' indica que vamos receber um método como parâmetro, no caso, o método isOk() / Tem um problema, não podemos receber qualquer função, temos que receber uma função que receba um tipo Response como parãmetro e que devolva um tipo Response, como o método isOk() faz. Pra isso criamos a interface HandlerFunction e mudamos o tipo da função que obterNegociacoes recebe como parâmetro de Function para HandlerFunction
        return fetch('http://localhost:8080/dados')
        .then(res => handler(res))
        .then(res => res.json())
        .then((dados: NegociacaoParcial[]) =>   //como o javascript não sabe qual é o tipo de dado q ta vindo, então ele coloca como 'any', dai é preciso declarar (dados: any[]), então vc passa para Negocicacao os dados correspondentes, vezes para quantidade e volume para valor. / no capítulo posterior mudamos de 'any' para 'NegociacaoParcial', q é uma interface q vai levar os métodos vezes e montante, pq nada impede q vc colocque dado.veze, sem o 's', e apareça undefined lá na view
            dados
                //quando passado o fetch para NegociacaoService, não usaremos forEach
                .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)) //se vc está fazendo o um map de uma variável do tipo any para uma do tipo Negociacao, logo o javascript já sabe q no for each o negociacao vai ser do tipo Negociacao
                // .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                // this._negociacoesView.update(this._negociacoes);
            )
        .catch(err => console.log(err.message));
        //Através da chamada da função then temos acesso à resposta que precisa ser convertida (parse) adequadamente e a Fetch API já traz na própria resposta o método .json() 
        //.json() realiza essa conversão de JSON para objetos em JavaScript. 
        //Como usamos arrow function sem bloco, o resultado da instrução res.json() é retornado automaticamente sem a necessidade de usarmos um return e quando fazemos isso, temos acesso ao retorno na próxima chamada encadeada à função then.
    }

}


export interface HandlerFunction{
    //Aqui em baixo o HandlerFunction ta restringindo a função, dizendo a ela re ela recebe uma Response como parâmetro e devolver uma Response como retorno.
    (res: Response): Response
    //a mudança é automática. Aparentemente qualquer método que receba uma função como parâmetro vai cair nessa restrição dessa interface

}