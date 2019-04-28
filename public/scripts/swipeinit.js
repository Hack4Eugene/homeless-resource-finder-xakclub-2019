
/* Verifies

*/
function verify(){

}


var options={
  pageClass: "drag-page",
  minDragDistance: 15,
  onDragEnd: verify,
}

// TOPNAME is located in js/forms currenly #age-demo
var el =new Dragend(document.getElementById(TOPNAME), options);
