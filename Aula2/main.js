function Moedas (callback) 
{
    $.ajax({url:"https://economia.awesomeapi.com.br/json/all"})
    .done(callback);
}

function ChangeMoeda (currency){
    console.log(currency);
    $.ajax({url:"https://economia.awesomeapi.com.br/last/"+currency})
    .done(data => 
    { 
        const c = data[currency.replaceAll("-", "")];
        console.log(data); 
        $("#diario").html("");
        $("#diario").append(`<span><h4>Compra</h4><h5>R$${c["bid"]}</h5></span>`);
        $("#diario").append(`<span><h4>Venda</h4><h5>R$${c["ask"]}</h5></span>`);
        $("#diario").append(`<span><h4>Data</h4><h5>${c["create_date"]}</h5></span>`);
        $("#diario").append(`<span><h4>Min</h4><h5>R$${c["high"]}</h5></span>`);
        $("#diario").append(`<span><h4>Max</h4><h5>R$${c["low"]}</h5></span>`);
        
        /* for(k in c)
        {
            $("#diario").append(`<span><h4>${k}</h4><h5>${c[k]}</h5></span>`);
        } */
    });
    
}

Moedas(x => 
{
    console.log(x);
    for(k in x)
    {
        const m = x[k];
        $("#moedas").append(`<option value="${m.code}-${m.codein}">${k}</option>`);
    }
    ChangeMoeda($("#moedas").val());
});

function MoedaData ()
{
    const currency = $("#moedas").val();
    const startDate = $("#start-data").val().replaceAll("-","");
    const endDate = $("#end-data").val().replaceAll("-","");
    const t = `/${currency}/200?start_date=${startDate}&end_date=${endDate}`;
    console.log(t);
    $.ajax({url:`https://economia.awesomeapi.com.br/${t}`})
    .done(data => {
        console.log(data);
        const list = [];
        $("#lista").html("");
        data.forEach(currencyData =>
        {
            const tstamp = new Date(currencyData.timestamp*1000);
            const day = FormatZero(tstamp.getDate() + 1);
            const month = FormatZero(tstamp.getMonth() +1);
            const year = tstamp.getFullYear();
            const hours = FormatZero(tstamp.getHours());
            const minutes = FormatZero(tstamp.getMinutes());
            const seconds = FormatZero(tstamp.getSeconds());

            list.push([`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`, parseFloat(currencyData.bid), parseFloat(currencyData.ask), parseFloat(currencyData.low), parseFloat(currencyData.high)]);
            
            $("#lista").append(`<li><h3>${day}/${month}/${year}</h3><h4>Compra: R$${currencyData.bid}</h4><h4>Venda: R$${currencyData.ask}</h4><h4>Min: R$${currencyData.low}</h4><h4>Max: R$${currencyData.high}</h4></li>`);
        });
        list.reverse();
        console.log(list);
        google.charts.load('current', {packages: ['corechart', 'line']});
        google.charts.setOnLoadCallback(x => { DrawGraph(list) });
    });
}

$("#busca").on("click", MoedaData);

function FormatZero (num) {
    return `${num>9?num:"0"+num}`;
}

function DateString (date){
    const d = date.toISOString();
    const endIndex = d.indexOf("T");
    console.log(d + " | " + endIndex);
    return d.slice(0, endIndex);
}

function DrawGraph(list) 
{
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Data');
    data.addColumn('number', 'Compra(R$)');
    data.addColumn('number', 'Venda(R$)');
    data.addColumn('number', 'Min(R$)');
    data.addColumn('number', 'Max(R$)');

    data.addRows(list);

    var options = {
    hAxis: {
        title: 'Data'
    },
    vAxis: {
        title: 'R$'
    }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}

const today = DateString(new Date());

$("#moedas").on("click", e => {ChangeMoeda(e.target.value);});
$("#start-data").val(today);
$("#end-data").val(today);