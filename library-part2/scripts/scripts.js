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
  if(t_show.style.display == "none" || t_show.style.display == "") {
    t_show.style.display = "block";
  } else {
    t_show.style.display = "none";
  }
}

// menu_showhide показываем и прячем меню
function menu_showhide(toButton,toMenu) {
  let m_menu = document.querySelector('.'+toMenu);
  let m_menu_open = toMenu+'__open';
  let m_button = document.querySelector('.'+toButton);
  if (m_menu){
    m_menu.addEventListener('click', function() {
      m_menu.classList.toggle(m_menu_open);
    });
  }
  if (m_button){
    m_button.addEventListener('click', function() {
      m_menu.classList.toggle(m_menu_open);

      // swap hamburger image
      let hamburger_open = document.getElementsByClassName('mobile-menu__open').length;
      let hamburger_pics = document.getElementsByClassName('pic-hamburger');
      let hamburger_pic = hamburger_pics[0];
      if (hamburger_open > 0){
        hamburger_pic.setAttribute('src', './images/pic-burger-open.png');
      } else {
        hamburger_pic.setAttribute('src', './images/pic-burger.png');
      }

    });
  }
}

// menu_hide прячем меню
function menu_hide(toMenu) {
  let h_menu = document.querySelector('.'+toMenu);
  let h_menu_open = toMenu+'__open';
  h_menu.classList.remove(h_menu_open);
}

// modal_showhide показываем и прячем модальные окна
function modal_showhide (toModal){
  let current_modal = 'modal-'+toModal;
  showhide('modal-wrapper');
  showhide(current_modal);
}

// modal_switch переключение модальных окон
function modal_switch (fromModal,toModal){
  let from_modal = 'modal-'+fromModal;
  let to_modal = 'modal-'+toModal;
  hide(from_modal);
  show(to_modal);
}

// carousel карусель
function carousel (toJump){
  let carousel = document.querySelector('.carousel');
  let car_total = carousel.getElementsByClassName('carousel-slide').length;
  let pagination = document.querySelector('.pagination');
  let carret_left = document.querySelector('.about-carret-left');
  let carret_right = document.querySelector('.about-carret-right');
  let jump = toJump;
  if (typeof jump == 'undefined'){jump = 1}
  jump = Number(jump);
  let car_width = window.outerWidth;
  window.addEventListener('resize', function() {
    car_width = window.outerWidth;
  });

  // pagination & slides
  let pag_item;
  let pag_item_sub;
  for (let i = 1; i<=car_total; i++){
    pag_item = pagination.querySelector('.pag-item'+i);
    pag_item_sub = pag_item.querySelector('.pagination-item');
    if (i == jump){
      // selected slide
      pag_item.removeAttribute('onclick');
      pag_item_sub.classList.add('pagination-item-active');
    } else {
      // all slides
      pag_item.setAttribute('onclick','carousel("'+i+'")');
      pag_item_sub.classList.remove('pagination-item-active');
    }
    //slides
    //document.querySelector('.slide'+i).style.visibility = '';
    document.querySelector('.slide'+i).classList.remove('slide-hide');
  }

  // carretes
  let shift_left = jump - 1;
  carret_left.setAttribute('onclick','carousel("'+shift_left+'")');
  carret_left.style.cursor = 'pointer';
  //console.log('shift_left='+shift_left);
  let shift_right = jump + 1;
  carret_right.setAttribute('onclick','carousel("'+shift_right+'")');
  carret_right.style.cursor = 'pointer';
  //console.log('shift_right='+shift_right);
  if (jump == 1){
    // 1st slide
    carret_left.removeAttribute('onclick');
    carret_left.style.cursor = 'default';
  } else if (jump == car_total){
    // last slide
    carret_right.removeAttribute('onclick');
    carret_right.style.cursor = 'default';
  }

  // slides
  let car_offset = 0;
  if (car_width > 1024){
    // desktop
    if (jump > 1){
      car_offset = -1*((jump-1)*475);
    } else {
      car_offset = 0;
    }
  } else {
    // tablet
    //let car_margin = car_width*0.2;
    //car_margin = car_margin + 'px';
    //document.querySelector('.about-images').style.marginLeft = car_margin;
    if (jump > 1){
      car_offset = -1*((jump-1)*550);
    } else {
      car_offset = 0;
    }
    // hide slides in tablet
    if (jump > 1){
      // previous slide
      document.querySelector('.slide'+shift_left).classList.add('slide-hide');
    }
    if (jump < car_total){
      // next slide
      document.querySelector('.slide'+shift_right).classList.add('slide-hide');
    }
  }

  // move slide
  document.querySelector('.carousel').style.transform = 'translateX('+car_offset+'px)';
  console.log('car_offset='+car_offset+'\n','jump='+jump+'\n','car_width='+car_width+'\n','car_total='+car_total+'\n');
}

// slider слайдер
function slider (toSlide){

  let current_season = toSlide;
  let slider_first_run;
  if (typeof current_season == 'undefined'){
    current_season = 'winter'
    slider_first_run = 1;
  }
  let seasons = ['winter', 'spring', 'summer', 'autumn'];

  for (let i = 0; i < seasons.length; i++) {
    let this_slide = document.querySelector('.slider-books-'+seasons[i]);
    if (seasons[i] == current_season){
      // selected slide
      if (slider_first_run == 1){
        this_slide.classList.add('favorites-slide-show');
      } else {
        this_slide.classList.remove('favorites-slide-hide');
        setTimeout(() => this_slide.classList.add('favorites-slide-show'), 1000);
      }
    } else {
      // all slides
      if (slider_first_run == 1){
        this_slide.style.zIndex = '-1';
        setTimeout(() => this_slide.style.zIndex = '1', 1000);
      }
      this_slide.classList.remove('favorites-slide-show');
      this_slide.classList.add('favorites-slide-hide');
    }
  }
}

// form_check проверка форм
function form_check (toForm){
  //const current_form = toForm+'_form';
  if (toForm == 'login'){
    // check login form
    let mail = document.getElementById('login_mail').value;
    let password = document.getElementById('login_password').value;
    login_form.submit();
  } else if (toForm == 'register'){
    // check register form
    register_form.submit();
  } else if (toForm == 'buy'){
    // check buy a card form
    buy_form.submit();
  }

}