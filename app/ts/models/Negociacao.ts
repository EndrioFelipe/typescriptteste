export class Negociacao {
    // private _data: Date;
    // private _quantidade: number;
    // private _valor: number; //é preciso especificar em tsconfig pra ignorar o tipo any q é atribuido 
                            //automaticamente
    
    constructor(readonly data: Date, readonly quantidade: number,  readonly valor: number) {
        //não precisa mais fazer o shadowing
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
}