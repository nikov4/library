function test2 () {
  const test2 = document.getElementById('test2');
  const ctrl2 = document.getElementById('ctrl2');
  test2.addEventListener('click', () => {
    test2.classList.toggle('two');
  });
  ctrl2.addEventListener('click', () => {
    test2.classList.toggle('two');
  });
}

function test3 () {
  const test3 = document.getElementById('test3');
  const ctrl3 = document.getElementById('ctrl3');
  test3.addEventListener('click', () => {
    test3.classList.toggle('box3__open');
  });
  ctrl3.addEventListener('click', () => {
    test3.classList.toggle('box3__open');
  });
}

function test4 () {
  const test4 = document.getElementById('test-4');
  const ctrl4 = document.getElementById('ctrl-4');
  test4.addEventListener("click", function() {
    test4.classList.toggle('box-4__open');
  });
  ctrl4.addEventListener("click", function() {
    test4.classList.toggle('box-4__open');
  });
}

/*
  var t_menu = document.querySelector('.' + toMenu);
  var t_menu_open = toMenu + '-open';
  //alert(t_menu_open);
  if (t_menu){
    t_menu.addEventListener('click', ()=>{
      alert('click');
      t_menu.classList.toggle('mobile-menu-open');


      //if(t_menu_state.className.display == "none") t_show.style.display = "block";
      //button.classList.toggle('submit', false)
      //if(t_menu.style.display == "none"){
        //t_menu.style.display = "block";
        //t_menu = document.body.classList.toggle('_active');

      //}
      //else t_menu.style.display = "none";
    });
  }
*/

/*
var scr_w = window.outerWidth;
scr_w = scr_w + 'px';
window.addEventListener('resize', function(event) {
  document.querySelector(".welcome-overlay").style.width = scr_w;
  },
true);
document.querySelector(".welcome-overlay").style.width = scr_w;
*/
