const controller =  new NegociacaoController();

// document
//         .querySelector('.form')
//         .addEventListener('submit', controller.adiciona.bind(controller)); //o bind serve pra passar o contexto do 'this' controller para a classe de negociacaoController
        
$('.form').submit(controller.adiciona.bind(controller));