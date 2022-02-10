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
  console.log(cep);
}

function CEPLocal ()
{
  if(cep.length != 8) return;
  $.ajax({url:`https://cep.awesomeapi.com.br/json/${cep}`})
  .done(data => 
  {
    console.log(data);
    $("#rua").html(`<span class="p">${data.address_type} </span> ${data.address_name}`);
    $("#bairro").html(`<span class="p">Bairro</span> ${data.district}`);
    $("#cidade").html(`<span class="p">Cidade</span> ${data.city}`);
    $("#ddd").html(`<span class="p">DDD</span> ${data.ddd}`);
    $("#ibge").html(`<span class="p">IBGE</span> ${data.city_ibge}`);
    $("#lat").html(`<span class="p">LAT</span> ${data.lat}`);
    $("#long").html(`<span class="p">LONG</span> ${data.lng}`);
   
    const t0 = `${url}&q=${data.lat},${data.lng}+(CEP%20${data.cep})&output=embed`;
    map.attr('src',t0); ///?api=1&zoom=${zoom}&maptype=${mtype}
  });
}

$("#CEP").on("input", CEPChange);
$("#search").on("click", CEPLocal);
