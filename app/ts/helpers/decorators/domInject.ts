export function domInject(seletor: string){ //esse 'seletor' é o seletor do css
    return function (target: any, key: string){
        let elemento: JQuery; //declarando um elemento do tipo JQuery q a princípio não tem nada.

        const getter = function(){
            if(!elemento){ //se elemento não tiver nada ele recebe o seletor
                console.log(`buscando  ${seletor} para injetar em ${key}`);
                elemento = $(seletor); //o $() é pq o elemento é um seletor jquery, por isso seletor vai dentro disso.
            } 
            return elemento;       
        }
        
        Object.defineProperty(target, key, {
            get: getter
        });
    }
}