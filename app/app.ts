import { NegocicacaoController } from "./controllers/negociacao-controller.js";
import { NegociacoesView } from "./views/negociacoes-view.js";
// import { View } from "./views/view.js";

const controller = new NegocicacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
} else {
    throw Error('Não foi possível inicializar a aplicação. Verifique se o form existe.');
}

// const view = new View("aaa");
// view.update("teste");

// const negociacoesView = new NegociacoesView;
// const template = negociacoesView.template;
// console.log('negociacoes view - ',template );