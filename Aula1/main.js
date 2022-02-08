class Calculadora 
{
    operators = [];
    operator = ""; 
    opA = "";
    opB = "";
    opN = false;

    constructor(){
        this.operators["+"] =  (a, b) => a+b;
        this.operators["-"] =  (a, b) => a-b;
        this.operators["*"] =  (a, b) => a*b;
        this.operators["/"] =  (a, b) => a/b;
    }
    
    clear()
    {
        this.opA = "";
        this.opB = "";
        this.opN = false;
        this.operator = ""; 
    }

    get result ()
    {
        if(this.operator == "") return 0;
        const r = this.operators[this.operator](parseFloat(this.opA), parseFloat(this.opB));
        this.clear();
        this.opA = `${r}`;
        return this.opA;
    }

    get show (){
        return this.opB != "" ? `${this.opA} ${this.operator} ${this.opB}` : this.operator != "" ? `${this.opA} ${this.operator}` : this.opA != "" ? `${this.opA}` : "0";
    }
    
    /**
     * @param {string} n
     */
    set operando (n)
    {
        if(this.opN){
            this.opB += n;
        }
        else 
        {
            this.opA += n;
        }
    }

    undo ()
    {
        if(this.opN){
            this.opB = this.opB.slice(0, -1);
        }
        else 
        {
            this.opA = this.opA.slice(0, -1);
        }
    }
}

const calc = new Calculadora();

$("#equal").on("click", (e) => 
{
    console.log(`Resultado ${calc.result}`);
    $("#visor").html(calc.show);
});

$("#del").on("click", (e) => 
{
    calc.undo();
    console.log(`Deletando`);
    $("#visor").html(calc.show);
});

$("#clear").on("click", (e) => 
{
    calc.clear();
    console.log(`Limpado!`);
    $("#visor").html(calc.show);
});

/* $("#operators").children().on("click", (e) => 
{
    console.log(e.target.innerText);
    calc.operator = e.target.innerText;
    calc.opN = !calc.opN;
    $("#visor").html(calc.show);
});
 */
for(key in calc.operators)
{
    const li = document.createElement("li");
    li.onclick = () => {
        console.log(e.target.innerText);
        calc.operator = e.target.innerText;
        calc.opN = !calc.opN;
        $("#visor").html(calc.show);
    };
    li.innerText = key;
    $("#operators").append(li);
    console.log(key);
}

$("#numbers").children().on("click", (e) => 
{
    const n = parseFloat(e.target.innerText);
    console.log(n);
    calc.operando = n;
    $("#visor").html(calc.show);
});
