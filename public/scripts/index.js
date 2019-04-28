// index.js -- The index file for handling basic JS crap.

element = document.getElementById('page-swipe');

window.swipePagination = new Swipe(element, {
    startSlide: 0,
    auto: 3000,
    draggable: true,
    autoRestart: false,
    continuous: false,
    disableScroll: true,
    stopPropagation: true,
    callback: function(index, element) {},
    transitionEnd: function(index, element) {}
});

$('.hover').hover(function() {
   $(this).css('opacity', '1');
}, function() {
    $(this).css('opacity', '.5');
});

function doWork(text){
  console.log("RESULTS text");
  if(typeof(text)==typeof(".")){
    text = JSON.parse(text);
    appendResults(text,document.querySelector("#results"))
  }
  else{
    appendResults(text,document.querySelector("#results"))
  }
}



async function fetchResults(type="food",demographics={}){
  var req = new XMLHttpRequest(),
    method = "POST",
    url = "/api/v1/submit/";

  req.open(method,url);

  console.log("asdfsadf sendin grequest");
  req.onreadystatechange= function(){
    console.log("is it done yet?");
     if(req.readyState === 4){
       doWork(req.responseText);

     }

    }
  req.send(demographics)
}
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

    // var request = new XMLHttpRequest();
    // request.open("POST", "/api/v1/all");
    // request.send(formData);
    console.log("sending it now,");
    fetchResults(",",formData);
});
