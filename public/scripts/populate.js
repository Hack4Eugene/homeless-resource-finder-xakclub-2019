function dummyForms(arr){
  arr[0].set("age",17);
  arr[0].set("sex","m");
  arr[0].set("veteran",0);
  arr[0].set("family",0);
  arr[0].set("location",null);
  arr[0].set("service", "any" );
  arr[0].set("top",3);

  arr[1].set("age",25);
  arr[1].set("sex","f");
  arr[1].set("veteran",1);
  arr[1].set("family",0);
  arr[1].set("location",null);
  arr[1].set("service", "transport");
  arr[1].set("top",0);


  arr[2].set("age",30);
  arr[2].set("sex","m");
  arr[2].set("veteran",1);
  arr[2].set("family",2);
  arr[2].set("location",null);
  arr[2].set("service","any" );
  arr[2].set("top",5);
}


var el = `[
 {
   "providerID": 1,
   "provider name": "mission",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "address 1",
   "phone": "555-5551",
   "email": "email@email.com",
   "website": "website.com"
 },
 {
   "providerID": 2,
   "provider name": "Eagan Warning",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "123 street b",
   "phone": "555-5552",
   "email": "email@email.com",
   "website": "website.com"
 },
 {
   "providerID": 3,
   "provider name": "Cahoots",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "123 street b",
   "phone": "555-5552",
   "email": "email@email.com",
   "website": "website.com"
 },
 {
   "providerID": 4,
   "provider name": "white bird",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "123 street b",
   "phone": "555-5552",
   "email": "email@email.com",
   "website": "website.com"
 },
 {
   "providerID": 6,
   "provider name": "ltd",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "123 street b",
   "phone": "555-5552",
   "email": "email@email.com",
   "website": "website.com"
 },
 {
   "providerID": 7,
   "provider name": "lyft",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "123 street b",
   "phone": "555-5552",
   "email": "email@email.com",
   "website": "website.com"
 },
 {
   "providerID": 8,
   "provider name": "uber",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "123 street b",
   "phone": "555-5552",
   "email": "email@email.com",
   "website": "website.com"
 },
 {
   "providerID": 5,
   "provider name": "food for lane county",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "123 street b",
   "phone": "555-5552",
   "email": "email@email.com",
   "website": "website.com"
 },
 {
   "providerID": 6,
   "provider name": "mission",
   "geolocation": "14.1212, -93.23932823",
   "physical address": "address 2",
   "phone": "555-5552",
   "email": "email@email.com",
   "website": "website.com"
 }
]`;

var results;
var div;

/* sets google map and and info to this detialed list */



var ds = [
   new FormData(),
   new FormData(),
   new FormData()
]
dummyForms(ds);


function doWork(text){
  if(typeof(text)==typeof(".")){
    console.log(text);
  }
  else{
    for(var pair of demographics.entries()) {
       console.log(pair[0]+ ', '+ pair[1]);
    }
  }
}



async function fetchResults(type="food",demographics={}){
  var req = new XMLHttpRequest(),
    method = "POST",
    url = "/api/v1/submit";
  req.open(method,url);
  req.onreadystatechange= function(){
     if(req.readyState === 4){
       doWork(req.responseText)
     }

    }
   req.send(demographics)
}

async function fetchMoreList(demographics={}){
  // url = `/api/v1/info/${demographics['providerID']}`;

  var req = new XMLHttpRequest(),
    method = "POST",
    url = `/api/v1/sumbmit`;
  req.open(method,url);
  req.onreadystatechange= function(){
     if(req.readyState === 4){
       doWork(req.responseText)
     }

    }
   req.send(demographics)

}


async function UnitTests(ds){
  try{
    console.log(await fetchResults("",ds[0]));
    console.log(await fetchMoreList("",ds[1]));
    console.log(await fetchResults("",ds[2]));
  }
  catch(e){
    console.log(e);
  }

}
UnitTests(ds);



/* calulate js maps directions

*/
var userG={};
function getUserLoc(info){
var x = navigator.geolocation;
console.log("permision: ",x);
    if (x) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setModal(info,pos);
        },(err)=>{
          switch(err.code) {
              case err.PERMISSION_DENIED:
              setModal(info,0);
                break;
              case err.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
              case err.TIMEOUT:
              setModal(info,0);
                break;
              case err.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
            }
        });
      }
    else {
      alert('location sharing is NOT supported hre')
        setModal(info,0);
    }

}
/* grabs the specific info from the list of info,
uses the ID in the list and makes a query t oget details.
*/
async function viewResults(evt){
    var id=evt.target.parentNode.getAttribute("data-id");
    var res=0;
    for(var i=0;i<results.length;i++){
      if(Number(results[i]["providerID"]) == Number(id)){
        res = el;
        break;
      }
    }
    if(res){
     getUserLoc(res);
      $(".modal").modal();
      return 1;
    }
    else{
      return 0;
    }
}


/* create a list */
function appendResults(div,data){
  var row;
  var col;
  var th;
  data.forEach(function (data, index){
    row = document.createElement("tr");
    row.setAttribute("data-id",data["providerID"]);
    th=document.createElement("th");
    th.setAttribute("scope","row");
    col = document.createElement("td");
    row.appendChild(th);
    row.appendChild(col.cloneNode(true))
    row.appendChild(col.cloneNode(true))
    row.appendChild(col.cloneNode(true))
    // row.appendChild(document.createElement("span"))
    row.childNodes[0].textContent=(index+1).toString();
    row.childNodes[1].textContent=data["provider name"];
    row.childNodes[2].textContent=data["service"];
    // row.childNodes[3].textContent=data["phone"];
    div.appendChild(row);
  });

  div.addEventListener("click",viewResults)

}

window.addEventListener("load",()=>{
  results= JSON.parse(el);
  div = document.querySelector("#results")
  var uluru = LIBGEO;

  var marker = new google.maps.Marker({position: uluru, map: BIGMAP});

  // map over list of results from api.
  var markers = results.map( (elem, index) =>{
    var geo = elem.geolocation.split(',');
    var geo = { lat: parseFloat(geo[0]) , lng: parseFloat(geo[1]) }
    return new google.maps.Marker({position: geo, map: BIGMAP});
  });

  appendResults(div,results);

})
