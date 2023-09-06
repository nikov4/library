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
  //alert('jump='+jump);

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
    } else{
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

//