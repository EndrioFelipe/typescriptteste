export class Negociacao {
    // private _data: Date;
    // private _quantidade: number;
    // private _valor: number; //é preciso especificar em tsconfig pra ignorar o tipo any q é atribuido 
                            //automaticamente
    
    constructor(private _data: Date, private _quantidade: number,  private _valor: number) {
        //não precisa mais fazer o shadowing
    }

    get data() {

        return this._data;

    }

    get quantidade() {

        return this._quantidade;

    }

    get valor() {

        return this._valor;
    }

    get volume() {

        return this._quantidade * this._valor;
    }
}