console.log('')

// show показываем объекты
function show(toShow) {
	var t_show = document.querySelector("." + toShow);
  t_show.style.display = "block";
}

// hide прячем объекты
function hide(toHide) {
	var t_hide = document.querySelector("." + toHide);
  t_hide.style.display = "none";
}

// show / hide показываем и прячем объекты
function showhide(toShow) {
	var t_show = document.querySelector("." + toShow);
  if(t_show.style.display=="none") t_show.style.display = "block";
	else t_show.style.display="none";
}


/*
var scr_w = window.outerWidth;
scr_w = scr_w + 'px';
window.addEventListener('resize', function(event) {
  document.querySelector(".welcome-overlay").style.width = scr_w;
  },
true);
document.querySelector(".welcome-overlay").style.width = scr_w;
*/


