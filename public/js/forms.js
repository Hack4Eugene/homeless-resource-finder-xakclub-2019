var submitbutton = document.querySelector("#thehead");
submitbutton.addEventListener("click",submit);
var p = document.querySelector("#wrapper");
p.addEventListener("click",submit);
console.log(p);

// if(submitbutton){
//   submitbutton.addEventListener("click",submit)
// }
// else{
//   console.log("missing submit button");
// }

var formdata = new FormData();
const TOPNAME = "age-demo";

/*This form is called after the swipe animation.
desc: it does a query selector and fetches a live array of divs, then sorts them
to find the one that is currently selected with .active.

assumptions:
  // xxxxxxx not. all the forms are in one top level <tag> with classname TOPNAME
*/
function submit(evnt=null){
  var form = document.querySelector("#"+TOPNAME).querySelectorAll("form");
  var info={};
  if(form){
    form.forEach( function (el,index){
      var name= el.name;
      var val = document.querySelector(`input[name="${name}"]:checked`).value;
      info[name]=val;
      formdata.set(name,val)
    });
  }

  // call http function now.
  console.log("sending..",info);
}
