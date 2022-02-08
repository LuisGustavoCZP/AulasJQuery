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
    console.log(startDate + " " + endDate);
    /* $.ajax({url:"https://economia.awesomeapi.com.br/json/all"})
    .done(callback); */
}

$("#busca").on("click", MoedaData);