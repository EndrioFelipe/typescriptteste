System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function logarTempoDeExecucao(emSegundos = false) {
        return function (target, propertyKey, descriptor) {
            const metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let divisor = 1;
                let unidade = 'milisegundos';
                if (emSegundos) {
                    divisor = 1000;
                    unidade = 'segundos';
                }
                console.log('-----------------------');
                console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                console.log(`Retorno do método original ${propertyKey}: ${JSON.stringify(retorno)}`);
                const t2 = performance.now();
                console.log(`O método ${propertyKey} (depois de alterado) demorou ${(t2 - t1) / divisor} ${unidade}`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("logarTempoDeExecucao", logarTempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
