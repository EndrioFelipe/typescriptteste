
export function imprime (...objeto: any[]) { //esses 3 pontinhos (Spread Operator) serve, basicamente, para você dizer que podem ser passados diversos parâmetros nessa função imprime().
    //coloquei do tipo any pra ele poder receber qualquer coisa mesmo, seja um objeto do tipo negociacao ou um aray do tipo negociacoes. No entantao não é exatamente qualquer coisa, quermos receber parêmetros que sejam pelo menos imprimíveis, por isso foi criada a classe Imprimivel em models.
    objeto.forEach(objeto => objeto.paraTexto());
}