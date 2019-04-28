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
