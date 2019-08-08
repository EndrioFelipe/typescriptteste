import {Imprimivel} from "../models/Imprimivel";

export function imprime (...objeto: Imprimivel[]) { //esses 3 pontinhos (Spread Operator) serve, basicamente, para você dizer que podem ser passados diversos parâmetros nessa função imprime().
    //coloquei do tipo any pra ele poder receber qualquer coisa mesmo, seja um objeto do tipo negociacao ou um aray do tipo negociacoes. No entantao não é exatamente qualquer coisa, queremos receber parêmetros que sejam pelo menos imprimíveis, por isso foi criada a classe Imprimivel em models. Com isso mudamos o tipo de 'any' para 'Imprimivel'
    objeto.forEach(objeto => objeto.paraTexto());//depois que colocamos o tupo do parâmetro da função como imprimível o autocomplete começa a fuincionar
}