function Moedas (callback) 
{
    $.ajax({url:"https://economia.awesomeapi.com.br/json/all"})
    .done(callback);
}

Moedas(x => 
{
    console.log(x);
    for(k in x)
    {
        $("#moedas").append(`<option>${k}</option>`);
    }
});

function MoedaData ()
{
    const currency = $("#moedas").val();
    const startDate = $("#start-data").val().replaceAll("-","");
    const endDate = $("#end-data").val().replaceAll("-","");
    const t = `/${currency}-BRL/200?start_date=${startDate}&end_date=${endDate}`;
    console.log(t);
    $.ajax({url:`https://economia.awesomeapi.com.br/${t}`})
    .done(data => {
        console.log(data);
        const list = [];
        data.forEach(currencyData =>{
            const day = new Date(currencyData.timestamp*1000).getDate() + 1;
            const month = new Date(currencyData.timestamp*1000).getMonth() +1;
            const year = new Date(currencyData.timestamp*1000).getFullYear();               
            list.push([`${day}/${month}/${year}`, parseFloat(currencyData.bid)]);
            
            $("#lista").append(`<li><h3>${currency}</h3><h5>${day}/${month}/${year}</h5><h4>${currencyData.low}</h4><h4>${currencyData.high}</h4><h4>${currencyData.bid}</h4></li>`);
        });
        list.reverse();
        console.log(list);
        google.charts.load('current', {packages: ['corechart', 'line']});
        google.charts.setOnLoadCallback(x => { DrawGraph(list) });
    });
}

$("#busca").on("click", MoedaData);

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
    data.addColumn('number', 'U$');

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

$("#start-data").val(today);
$("#end-data").val(today);