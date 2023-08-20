// show показываем объекты
function show(toShow) {
	var t_show = document.querySelector('.' + toShow);
  t_show.style.display = 'block';
}

// hide прячем объекты
function hide(toHide) {
	var t_hide = document.querySelector('.' + toHide);
  t_hide.style.display = 'none';
}

// show / hide показываем и прячем объекты
function showhide(toShow) {
  var t_block = document.getElementById(toShow);
  var t_block_open = toShow + '__open';
  t_block.addEventListener('click', () => {
    t_block.classList.toggle(t_block_open);
  });
  //var t_show = document.querySelector("." + toShow);
  //if(t_show.style.display == "none") t_show.style.display = "block";
	//else t_show.style.display = "none";
}

function menu_showhide() {
  var m_menu = document.getElementById('mobile-menu');
  var m_menu_open = 'mobile-menu__open';
  var m_hamurger = document.querySelector('.hamburger');
  //var m_hamurger_active = 'hamburger__active';
  m_menu.addEventListener('click', () => {
    m_menu.classList.toggle(m_menu_open);
  });
  m_hamurger.addEventListener('click', () => {
    m_menu.classList.toggle(m_menu_open);
  });

}