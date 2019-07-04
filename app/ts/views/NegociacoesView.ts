
//import View = Views.View; //uma maneira de não ter que ficar escrevendo Views.View na frente de View<Negociacoes>
import { View } from './View';


export class NegociacoesView extends View<Negociacoes> {


    template(modelo: Negociacoes): string {
        
        return ` 
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
                ${modelo.paraArray().map(negociacao => {
                        return `
                            <tr>
                                <td>${negociacao.data.getDate()}/${negociacao.data.getMonth() + 1}/${negociacao.data.getFullYear()}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                                <td>${negociacao.volume}</td>
                            <tr>
                        `
                    }).join('') // tem que botar um espaço em branco dentro do join para que ele não use ',' como separador dentro do array                
                    //teste
                }
            </tbody>

            <tfoot>
            </tfoot>
        </table>        
        `;
    }
}



