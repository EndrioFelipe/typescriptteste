import { NegociacoesView } from '../views/NegociacoesView';
import { MensagemView } from '../views/MensagemView';
import { Negociacoes } from '../models/Negociacoes';
import { Negociacao } from '../models/Negociacao';
import { NegociacaoParcial } from '../models/NegociacaoParcial';
import { domInject } from '../helpers/decorators/domInject'
import { throttle } from '../helpers/decorators/throttle'

//procure na aula 01 vídeo 07 caso queira deixar esses imports mais enxutos

export class NegociacaoController {
    @domInject("#data") //decorator é q vai receber os ids
    private _inputData: JQuery; //esse _inputData vai ser transformado num getter, dentro desse getter vai ter a lógica de q se alguém acessar esse id no dom, ele vai ser guardado no cache e o sistema não terá a necessidade de recarregá-lo de novo. LazyLoading
    @domInject("#quantidade")
    private _inputQuantidade: JQuery;
    @domInject("#valor")
    private _inputValor: JQuery;
    private _negociacoes = new Negociacoes(); //Não precisa colocar ': Negociacoes' pq o typescript já infere q é do tipo Negociacoes após colocar o new
    private _negociacoesView = new NegociacoesView('#negociacoesView', true); //esse Views na frente é por causa do namespace. Ver classe 'View'.
    private _mensagemView = new MensagemView('#mensagemView', true); //depois do seletor, o construtor pede outro parâmetro q é o boolean pedind pra informar se vc quer escapar ou não do filtro q impede de adicionar novas tags <script> no template. Coloca-se true pq vc quer escapar.

    constructor(){
        // a conversão <HTMLInputElement> é necessária pq ele é um tipo mais específico em relação ao 
        //tipo Elemento recebido pelo document.querySelector
        //------------------
        //com o uso do decorator, vamos passar as referências dos id's para ele, não mais pelo construtor
        // this._inputData = $("#data");
        // this._inputQuantidade = $("#quantidade");
        // this._inputValor = $("#valor"); 
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

    @throttle()
    importaDados(){     
        
        function isOK(res: Response){
            if(res.ok){ //esse ok é um método do tipo response
                console.log("sdf");
                return res;
            } else {
                throw new Error(res.statusText); //esse statusText é um método do tipo response / devolve o status code
            }
        }
        fetch('http://localhost:8080/dados').then(res => isOK(res))
        .then(res => res.json())
        .then((dados: NegociacaoParcial[]) => {  //como o javascript não sabe qual é o tipo de dado q ta vindo, então ele coloca como 'any', dai é preciso declarar (dados: any[]), então vc passa para Negocicacao os dados correspondentes, vezes para quantidade e volume para valor. / no capíyulo posterior mudamos de 'any' para 'NegociacaoParcial', q é uma interface que q vai levar os métodos vezes e montante, pq nada impede q vc colocque dado.veze, sem o 's', e apareça undefined lá na view
            dados
                .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante)) //se vc está fazendo o um map de uma variável do tipo any para uma do tipo Negociacao, logo o javascript já sabe q no for each o negociacao vai ser do tipo Negociacao
                .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            })
        .catch(err => console.log(err.message)); //pega os erros
        //Através da chamada da função then temos acesso à resposta que precisa ser convertida (parse) adequadamente e a Fetch API já traz na própria resposta o método .json() 
        //.json() realiza essa conversão de JSON para objetos em JavaScript. 
        //Como usamos arrow function sem bloco, o resultado da instrução res.json() é retornado automaticamente sem a necessidade de usarmos um return e quando fazemos isso, temos acesso ao retorno na próxima chamada encadeada à função then.
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




// Em TypeScript também podemos criar decoradores de classes. Um decorador de classe nos dá acesso ao constructor da class que estamos decorando. Vejamos um exemplo:

// export function meuDecoratorDeClasse() {

//     return function(constructor: any) {

//        // guarda o constructor original, pois iremos definir um novo
//         const original = constructor;

//        // cria um novo constructor. Como ele pode receber nenhum ou mais parâmetros, usamos ...args: any[]
//         const novo: any = function (...args: any[]) {
//             console.log("Criando uma instância com New: " + original.name); 
//             // cria a instância da classe quando for chamado 
//             return new original(...args);
//         }

//        // importante! O prototype do novo constructor deve ser o mesmo do original
//         novo.prototype = original.prototype;

//         // retorna o novo constructor
//         return novo;
//     }
// }

// Nosso decorator exibirá apenas uma mensagem no console indicando que chamará o constructor da classe.

// // código anterior omitido

// @meuDecoratorDeClasse()
// export class NegociacaoController {
//    // código omitido 
// }