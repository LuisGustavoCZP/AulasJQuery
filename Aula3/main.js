const key = `AIzaSyDAj4mG_DKWUJgK4Pv0BB5eUj9PQ-aMXT8`;
const map = document.getElementById("gmap");
let mtype = "satellite";
let zoom = 18;
let cep = "";

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
    map.src = `https://www.google.com/maps/embed/v1/view?key=${key}&center=${data.lat},${data.lng}&zoom=${zoom}&maptype=${mtype}`;
  });
}

$("#CEP").on("input", CEPChange);
$("#search").on("click", CEPLocal);
