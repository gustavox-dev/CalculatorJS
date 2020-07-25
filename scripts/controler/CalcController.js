
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
    18: .push() -> Adiciona um elemento no Array
    19: .pop() -> remove o ultimo elemento do array
    20: .length -> Retorna a quantidade de elementos de dentro do Array
    21: isNaN -> Retorna 'true' quando o elemento não é um número
    22: .toString() -> Transforma um 
    23: indexOf -> retorna o valor solicitado de dentro da String
*/ 

class CalcController {
   
    constructor(){
        
        this._operation = []
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

    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false)

        })

    }

    clearAll() {

        this._operation = []

    }

    clearEntry() {

        this._operation.pop()

    }

    getLastOperation() {

        return this._operation[this._operation.length-1]

    }

    setLastOperation(value) {
        this._operation[this._operation.length-1] = value
    }

    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1) 

    }

    
    addOperation(value) {

        //se a ultima operação não tiver numero
        if(isNaN(this.getLastOperation())) {

            //String -> Se for operador executará esse comando
            
            if(this.isOperator(value)){
                // Trocar o operador

                this.setLastOperation(value)

            } else if (isNaN(value)){
                // Outra coisa
                console.log(value)
            } else {
                this._operation.push(value)


            }

        } else {//Número
            let newValue = this.getLastOperation().toString() + value.toString()
            this.setLastOperation(parseInt(newValue))
        }


        this._operation.push(value) //Adiciona um elemento ao Array

        console.log(this._operation)

    }

    setError(){

        this.displayCalc = "Error"

    }

    execBtn(value) {

        switch (value) {

            case 'ac' :
                this.clearAll()
                break

            case 'ce':
                this.clearEntry()
                break
            case 'soma':
                this.addOperation('+')
                break
            case 'subtracao':
                this.addOperation('-')
                break

            case 'divisao':
                this.addOperation('/')
                break

            case 'multiplicacao':
                this.addOperation('*')
                break

            case 'porcento':
                this.addOperation('%')
                break
            case 'igual':
                this.addOperation('=')
                break

            case 'ponto':
                this.addOperation('.')
                break

            case '0':
            case '1':
            case '2': 
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':            
                this.addOperation(parseInt(value))
                break

            default:
                this.setError()
            break


        }

    }

    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, "click drag", e=> {
                
                let textBtn = btn.className.baseVal.replace("btn-", "")

                this.execBtn(textBtn)
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