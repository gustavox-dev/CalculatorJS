
/*  
    1: Classe = conjunto de atributos e metodos
    2: Encapsulamento protege para saber quem pode acessar aquele metodo.
    3: public -> Todos acessam 
    4: Atributos definidos com o '_ : Ex: this._displayCalc' estão como protected. Só outros atributos e metodos de dentro da própria classe podem ter acesso a esses atributos. 
    5: this = refencia o objeto que foi instanciado.
    6: get e set permitem definir como acessar os valores
    7: Sempre que for reutilizar um bloco de código pode ser criado um METODO para automatizar o código
    8: Data e hora formatada pela localidade => toLocaleDateString() e toLocaleTimeString().
    9: Atributo, similar a uma variável mas, com mais funcionalidades. 
    10: INITIALIZE => Tudo que eu quiser que aconteça quando começar a calculadora deve-se chamar o initialize e deve ser chamado no 'construtor'.
    11: Sempre que for criado um atributo privado é necessário criar um getter and setter
    12: Milisegundos => 1 segundo = 1000, 10 segundos = 10000
    13: querySelectorAll => Traz todos os elementos que são filhos da classe ou id selecionado
    14: for each -> Para cada
    15: replace -> Substitua
    16: addEventListener() -> Recebe 2 parametros, por exemplo, o 'click' e o que deve ser feito (declarado na (função (e))
    17: Split() -> transforma uma string em array
*/ 

class CalcController {
   
    constructor(){
        
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display") 
        this._dateEl = document.querySelector("#data")
        this._timeEl = document.querySelector("#hora")
        this._currentDate       
        this.initialize()
        this.setDisplayDateTime()
        this.initButtonsEvents()

    }

    
    initialize() {
        
        this.setDisplayDateTime()
        // Função executada em um intervalo de tempo - Tempo marcado em milisegundos -
        setInterval(() => { this.setDisplayDateTime() }, 1000)

    }

    addEventListenerAll(element, event, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false)

        })

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll('click drag mouseover', e=> {
                console.log(btn.className.baseVal.replace("btn-", ""))
            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

                btn.style.cursor = "pointer" // Altera o ponteiro do mouse para mostrar a mão de link

            })

        })
    }


    //Data e Hora
    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    
    get displayTime() {
        return this._timeEl.innerHTML
    }

    set displayTime(value) {
         this._timeEl.innerHTML = value
    }

    get displayDate() {
        return this._dateEl.innerHTML
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(valor) {
        this._displayCalcEl.innerHTML = valor;
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}