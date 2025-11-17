const profile = document.querySelector("a.profile");
profile.onclick = function (){
  const profmenu = document.querySelector(".profilemenu");
  profmenu.classList.remove("remove");
}

function leave(){
   const profmenu = document.querySelector(".profilemenu");
  profmenu.classList.add("remove");
}