function dummyForms(arr){
  arr[0].set("age",17);
  arr[0].set("sex","m");
  arr[0].set("veteran",0);
  arr[0].set("children",0);
  arr[0].set("location",null);
  arr[0].set("type", 3 );

  arr[1].set("age",25);
  arr[1].set("sex","f");
  arr[1].set("veteran",1);
  arr[1].set("children",0);
  arr[1].set("location",null);
  arr[1].set("type", 3);

  arr[2].set("age",30);
  arr[2].set("sex","m");
  arr[2].set("veteran",1);
  arr[2].set("children",2);
  arr[2].set("location",null);
  arr[2].set("type",3 );
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

var results= JSON.parse(el);
var div = document.querySelector("#results")

function setModal(data){
  var modal = document.querySelector(".modal");
  var head = modal.querySelector(".modal-header");
  var body = modal.querySelector(".modal-body");
}

var ds = [
   new FormData(),
   new FormData(),
   new FormData()
]
dummyForms(ds);


function doWork(text){
  if(typeof(text)==typeof(".")){
    text = JSON.parse(text);
    console.log(text);
  }
  else{
    console.log(text);
  }
}



async function fetchResults(type="food",demographics={}){
  var req = new XMLHttpRequest(),
    method = "GET",
    url = "/api/v1/submit/";
  req.open(method,url);
  req.onreadystatechange= function(){
     if(req.readyState === 4 && req.status === 200){
       console.log("req came back");
       doWork(req.responseText)
     }

    }
    // arr[2].set("age",30);
    // arr[2].set("sex","m");
    // arr[2].set("veteran",1);
    // arr[2].set("children",2);
    // arr[2].set("location",null);
    // arr[2].set("type",3 );
  req.send(demographics)
}

async function fetchMoreList(type="food",demographics={}){


}


async function UnitTests(ds){
  try{
    console.log(await fetchResults(ds[0]));
    console.log(await fetchResults(ds[1]));
    console.log(await fetchResults(ds[2]));
  }
  catch(e){
    console.log(e);
  }
}
UnitTests(ds);



function viewResults(evt){
    console.log(evt.target.parentNode.childNodes);
    var id=evt.target.parentNode.getAttribute("data-id");
    console.log(id);
    var res=0;
    for(var i=0;i<results.length;i++){
      if(Number(results[i]["providerID"]) == Number(id)){
        res = el;
        break;
      }
    }
    if(res){
      setModal(res);
      $(".modal").modal();
      return 1;
    }
    else{
      return 0;
    }
}

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
    row.childNodes[0].textContent=index.toString();
    row.childNodes[1].textContent=data["provider name"];
    row.childNodes[2].textContent=data["email"];
    row.childNodes[3].textContent=data["phone"];
    div.appendChild(row);
  });

  div.addEventListener("click",viewResults)

}

appendResults(div,results);
