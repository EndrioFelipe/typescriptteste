export function logarTempoDeExecucao(emSegundos: boolean = false) {
    //a função de decorator deve retornar outra função, q é onde a codificação vai ficar
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) { //embora estejamos usando o '"strictNullChecks": true' lá no tsconfig.json, q não permite que uma variável já declarada com outro tipo receba 'any', mas não impede que declaremos uma variável do tipo 'any'.
    //target: target é aquele que possui uma referência para o elemento cujo método foi decorado por logarTempoDeExecucao()
    //propertykey: retorna o nome do método decorado
    //descriptor: dará acesso ao método que desejamos modificar sua execução, através de descriptor.value

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) { //vamos alterar a função original. O 'function(...args: any[])' é uma função q o método original recebe em que '...args' serve para receber 0 ou vários valores que o método original possa ter como parâmetro, e any[] indica q esses parâmetros do método orinal possam ser de qualquer tipo.
            let divisor = 1;
            let unidade = 'milisegundos'
            if(emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
        
            console.log('-----------------------')
            console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`); //JSON.stringify(args) --> passa para string os parâmentros do método original, q é representado por 'args'
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args); //o apply através do 'this' recebe o contexto do método original e através do 'args', o apply pode colocar parâmetros a mais que vc queira passar para o retorno do método original / aqui tb é onde é rodado todo o método original
            console.log(`Retorno do método original ${propertyKey}: ${JSON.stringify(retorno)}` )
            const t2 = performance.now();
            console.log(`O método ${propertyKey} (depois de alterado) demorou ${(t2 - t1)/divisor} ${unidade}`);            
            return retorno;
        }

        return descriptor;

    }
}