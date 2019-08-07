export interface NegociacaoParcial {
    //a vantagem de usar essa interface é que, caso na api o cara lá troque o nome da variável de 'vezes' pra 'valor', basta vc trocar aqui q ele vai reclamar de erro até q vc troque o nome de vezes pra valor lá em NegociacoesController
    vezes: number;
    montante: number;

    //Não podemos usar os modificadores private, protected e public nas propriedades de uma interface. No caso, recebemos a mensagem de erro:
//    'private' modifier cannot appear on a type member.`
}