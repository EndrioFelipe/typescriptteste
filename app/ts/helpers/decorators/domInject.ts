export function domInject(seletor: string){ //esse 'seletor' é o seletor do css
    return function (target: any, key: string){
        let elemento: JQuery; //declarando um elemento do tipo JQuery q a princípio não tem nada.

        const getter = function(){
            if(!elemento){ //se elemento não tiver nada ele recebe o seletor
                console.log(`buscando  ${seletor} para injetar em ${key}`); //o key aqui pega o nome da variável q estou interceptando, no caso, _inputData, _inputQuantidade e _inputValor.
                elemento = $(seletor); //o $() é pq o elemento é um seletor jquery, por isso seletor vai dentro disso.
            } 
            return elemento;       
        }
        
        //como não é possível simplesmente pegar a função getter e passar para target, usamos o Object.defineProperty para fazer isso.
        Object.defineProperty(target, key, {
            //esse último parâmetro que está entre chaves define se vc quer um get ou um set, nesse caso, um get
            get: getter //passamos a função 'getter' para o get
        });

        //esse mecanismos chamamos de Lazy Loading
    }
}