import {Imprimivel} from "./Imprimivel";
import {Igualavel} from "./Igualavel";

export class Negociacao implements Imprimivel, Igualavel<Negociacao>{
    // private _data: Date;
    // private _quantidade: number;
    // private _valor: number; //é preciso especificar em tsconfig pra ignorar o tipo any q é atribuido 
                            //automaticamente
    
    constructor(readonly data: Date, readonly quantidade: number,  readonly valor: number) {
        //não precisa mais fazer o shadowing
        //super(); //como o número de parâmetros do construtor da classe filha é maior que o da classe pai, dá erro de compilação, então somos obrigados a chamar super(). Isso se Imprimivel continuasse sendo uma classe, mas agora é uma interface, então não faz mais diferença.
        
    }

    //*****Quando você muda o encapsulamento de private para readonly, logo eles se tornam apenas leitura 
    //e os métodos get se tornam inúteis. Tira-se também o _ da frente dos nomes dos atributos, para ficar
    //compatível com os métodos gets antigos que não utilizavam o _ para ler os objetos  

    // get data() {

    //     return this._data;

    // }

    // get quantidade() {

    //     return this._quantidade;

    // }

    // get valor() {

    //     return this._valor;
    // }



    get volume() {

        return this.quantidade * this.valor;
    }

    paraTexto(): void {
        console.log('-- paraTexto --');
        console.log(
            `Data: ${this.data}
            Quantidade: ${this.quantidade}, 
            Valor: ${this.valor}, 
            Volume: ${this.volume}`
        );
    }

    ehIgual(negociacao: Negociacao): boolean {

        return this.data.getDate() == negociacao.data.getDate()
            && this.data.getMonth() == negociacao.data.getMonth()
            && this.data.getFullYear() == negociacao.data.getFullYear();
    }
}