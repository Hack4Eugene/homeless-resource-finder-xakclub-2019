// index.js -- The index file for handling basic JS crap.

// element = document.getElementById('page-swipe');
//
// window.swipePagination = new Swipe(element, {
//     startSlide: 0,
//     auto: 3000,
//     draggable: true,
//     autoRestart: false,
//     continuous: false,
//     disableScroll: true,
//     stopPropagation: true,
//     callback: function(index, element) {},
//     transitionEnd: function(index, element) {}
// });

$('.hover').hover(function() {
   $(this).css('opacity', '1');
}, function() {
    $(this).css('opacity', '.5');
});

$('.interactive').click(function() {

})

$('#formSubmit').click(function() {
    sex = $('#sexSelector').val();
    age = $('#ageSelector').val();

    //TODO FIX THIS.
    isFamily = false;
    isVet = false;

    serviceVar = 'any';

    formData = new FormData();

    formData.set('sex', sex);
    formData.set('age', age);
    formData.set('family', isFamily);
    formData.set('veteran', isVet);
    formData.set('service', serviceVar);
    formData.set('top', 0);

    var request = new XMLHttpRequest();
    request.open("POST", "/api/v1/all");
    request.send(formData);
});


const LIBGEO = {lat: 44.048335, lng: -123.0962336};
const LTDGEO = {lat: 44.0484533,lng: -123.1614783};
const LIBADDR = "100 W 10th Ave, Eugene, OR 97401";
const LTDADDR = "1099 Olive St, Eugene, OR 97401";
const end = "14.1212, -93.23932823";
var BIGMAP;
function initMap() {
  // The location of Uluru
  // The map, centered at Uluru
  BIGMAP = new google.maps.Map(
      document.getElementById('map'), {zoom: 10, center: LIBGEO});

}


function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

function calculateAndDisplayRoute(gps=[0,0],directionsDisplay, directionsService,
    markerArray, stepDisplay, map) {
  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }
// ?  befaft=[userGEO,data];// before and after coordinates
  // gps[0]= 1 ? gps[0] : LIBGEO;
  // gps[1]= 1 ? gps[1] : LIBGEO;
  console.log(gps);
  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService.route({
    origin: new google.maps.LatLng(gps[0].lat, gps[0].lng),
    destination: LIBADDR,
    travelMode: 'WALKING'
  }, function(response, status) {
    // Route the directions and pass the response to a function to create
    // markers for each step.
    if (status === 'OK') {

      directionsDisplay.setDirections(response);
      showSteps(response, markerArray, stepDisplay, map);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
/////////////////////////////////////////////////////////////

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
        stepDisplay, marker, myRoute.steps[i].instructions, map);
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}


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
  arr[1].set("service", "bed");
  arr[1].set("top","asdf");

  arr[2].set("age",30);
  arr[2].set("sex","m");
  arr[2].set("veteran",1);
  arr[2].set("family",2);
  arr[2].set("location",null);
  arr[2].set("service","any" );
  arr[2].set("top",5);
}


var div = document.querySelector("#results")


/* sets google map and and info to this detialed list */


function setModal(data,userGEO=LIBGEO){
  var modal = document.querySelector(".modal");
  var head = modal.querySelector(".modal-header");
  var body = modal.querySelector(".modal-body");
  if(userGEO){

    userGEO = {
      lat: userGEO.coords.latitude,
      lng: userGEO.coords.longitude
    }

  }

  console.log("userdg",userGEO,LIBGEO);

  var markerArray = [];
  console.log("hello");
  befaft=[userGEO,LIBADDR];// before and after coordinates
  // Instantiate a directions service.
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map-modal'), {
    zoom: 20,
    center: LIBGEO
  });
  // Create a renderer for directions and bind it to the map.
  var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

  // Instantiate an info window to hold step text.
  var stepDisplay = new google.maps.InfoWindow;
  var marker = new google.maps.Marker({
            position: userGEO,
            label: "YOU ARE HERE",
            map: map
          });

  // Display the route between the initial start and end selections.
  calculateAndDisplayRoute(befaft,
      directionsDisplay, directionsService, markerArray, stepDisplay, map);
}

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

async function fetchMoreList(type="food",demographics={}){


}


async function UnitTests(ds){
  try{
    console.log(await fetchResults("",ds[0]));
    console.log(await fetchResults("",ds[1]));
    console.log(await fetchResults("",ds[2]));
  }
  catch(e){
    console.log(e);
  }
}
UnitTests(ds);



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
    row.childNodes[0].textContent=index.toString();
    row.childNodes[1].textContent=data["provider name"];
    row.childNodes[2].textContent=data["service"];
    // row.childNodes[3].textContent=data["phone"];
    div.appendChild(row);
  });

  div.addEventListener("click",viewResults)

}

appendResults(div,results);