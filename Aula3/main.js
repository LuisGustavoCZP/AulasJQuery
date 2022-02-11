const key = `AIzaSyDAj4mG_DKWUJgK4Pv0BB5eUj9PQ-aMXT8`;
const map = $("#gmap");
let mtype = "satellite";
let zoom = 16;
let cep = "";
const url = "https://www.google.com/maps?api=1";

///search/
function CEPChange (e)
{
  cep = e.target.value;
  if(cep.length != 8) 
  {
    e.target.classList.add("r");
  } 
  else 
  {
    e.target.classList.remove("r");
  }
  
  console.log(cep);
}

function ClearFields (){
  $("#rua").html("");
  $("#bairro").html("");
  $("#cidade").html("");
  $("#ddd").html("");
  $("#ibge").html("");
  $("#lat").html("");
  $("#long").html("");
  map.attr('src', "");
}

function CEPLocal ()
{
  const result = $("#result");
  if(cep.length != 8) {
    result.addClass("r");
    result.html("Indique um CEP com 8 digitos!");
    ClearFields ();
    return;
  }

  $.ajax({url:`https://cep.awesomeapi.com.br/json/${cep}`})
  .done(data => 
  {
    console.log(data);
    result.html("O CEP indicado foi encontrado");
    result.removeClass("r");
    
    $("#rua").html(`<span class="p">${data.address_type} </span> ${data.address_name}`);
    $("#bairro").html(`<span class="p">Bairro</span> ${data.district}`);
    $("#cidade").html(`<span class="p">Cidade</span> ${data.city}`);
    $("#ddd").html(`<span class="p">DDD</span> ${data.ddd}`);
    $("#ibge").html(`<span class="p">IBGE</span> ${data.city_ibge}`);
    $("#lat").html(`<span class="p">LAT</span> ${data.lat}`);
    $("#long").html(`<span class="p">LONG</span> ${data.lng}`);
   
    const t0 = `${url}&q=${data.lat},${data.lng}+(CEP%20${data.cep})&output=embed`;
    map.attr('src',t0); ///?api=1&zoom=${zoom}&maptype=${mtype}
  }).fail(function (jqXHR, textStatus) {
    result.addClass("r");
    result.html("O CEP indicado não foi encontrado!")
    ClearFields ();
  });
}

//$("#CEP").on("input", CEPChange);
$("#CEP").on("keyup", CEPChange);
$("#search").on("click", CEPLocal);
