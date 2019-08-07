export function throttle(milissegundos = 500) { //se não passar nada no parâmetro, o padrão vai ser meio segundo / o typescript já infere o tipo se vc atribuir um valor
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;
        let timer = 0; 
        //A declaração de let timer não pode estar dentro da função passada para descriptor.value, caso contrário toda vez que o método decorador for chamado uma nova variável será criada, queremos atualizar a mesma em cada chamada, por isso ela deve ficar no escopo de throttle e não do descriptor.
        descriptor.value = function(...args: any[]) { 
            //como esse decorator se trata de um evento, não precisa retornar nada

            //if(event) event.preventDefault; //como eu to usando esse decorator no método adiciona, como esse decorator tem um tempo de meio segundo, o event.preventDefault não funciona lá no método adiciona e a página é recarregada. Então é melhor trazer o event.preventDefault() pra cá. / event deprecated
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);                         
            
        }
        return descriptor;
    }
}