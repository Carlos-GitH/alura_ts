import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { MensagemView } from "../views/mensagem-view.js";
import { DiaDaSemana } from "../enums/dias-da-semana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export class NegocicacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView = new MensagemView('#mensagemView');
    // private readonly SABADO = 6;
    // private readonly DOMINGO = 0;

    constructor() {
        this.inputData = document.querySelector('#data') as HTMLInputElement;
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    @logarTempoDeExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        )
        // const negociacao = this.criaNegocicacao();
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update("Apenas negociações em dias úteis são aceitas");
            return;
        }
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.lista())
        this.limparFormulario();
        this.atualizaView();
        // this.negociacoesView.update(this.negociacoes);
        // this.mensagemView.update("Negociação adicionada com sucesso");
        
    }

    private ehDiaUtil(date: Date) {
        return date.getDay() > DiaDaSemana.DOMINGO && date.getDay() < DiaDaSemana.SABADO
    }


    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso");
    }
}