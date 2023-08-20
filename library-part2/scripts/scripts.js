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
  var t_show = document.querySelector("." + toShow);
  if(t_show.style.display == "none") t_show.style.display = "block";
	else t_show.style.display = "none";
}

// menu_showhide показываем и прячем меню
function menu_showhide() {
  let m_menu = document.querySelector('.mobile-menu');
  let m_menu_open = 'mobile-menu__open';
  let m_hamurger = document.querySelector('.hamburger');
  if (m_menu){
    m_menu.addEventListener('click', function() {
      m_menu.classList.toggle(m_menu_open);
    });
  }
  if (m_hamurger){
    m_hamurger.addEventListener('click', function() {
      m_menu.classList.toggle(m_menu_open);
    });
  }
}

// menu_hide прячем меню
function menu_hide() {
  let m_menu = document.querySelector('.mobile-menu');
  let m_menu_open = 'mobile-menu__open';
  m_menu.classList.remove(m_menu_open);
}