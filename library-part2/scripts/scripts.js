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

  // clear unused spaces
  trim_spaces(toForm);

  // check login form
  if (toForm == 'login'){

    // mail must valid
    let login_mail = document.getElementById('login_mail');
    let login_mail_test = test_mail(login_mail.value);
    if (login_mail_test == false){
      login_mail.classList.add('logon-input-error');
    } else {
      login_mail.classList.remove('logon-input-error');
    }

    // password must contain at least 8 characters
    let login_password = document.getElementById('login_password');
    let login_password_lenght = login_password.value.length;
    if (login_password_lenght < 8){
      login_password.classList.add('logon-input-error');
    } else {
      login_password.classList.remove('logon-input-error');
    }

    // save user if ok
    if (login_mail_test == true && login_password_lenght >= 8){
      login_form.submit();
    }
  }

  // check register form
  else if (toForm == 'register'){

    // first name must contain at leat 1 character
    let register_first_name = document.getElementById('register_first_name');
    let register_first_name_lenght = register_first_name.value.length;
    if (register_first_name_lenght < 1){
      register_first_name.classList.add('logon-input-error');
    } else {
      register_first_name.classList.remove('logon-input-error');
    }

    // last name must contain at leat 1 non-space character
    let register_last_name = document.getElementById('register_last_name');
    let register_last_name_lenght = register_last_name.value.length;
    if (register_last_name_lenght < 1){
      register_last_name.classList.add('logon-input-error');
    } else {
      register_last_name.classList.remove('logon-input-error');
    }

    // mail must valid
    let register_mail = document.getElementById('register_mail');
    let register_mail_test = test_mail(register_mail.value);
    if (register_mail_test == false){
      register_mail.classList.add('logon-input-error');
    } else {
      register_mail.classList.remove('logon-input-error');
    }

    // password must contain at least 8 characters
    let register_password = document.getElementById('register_password');
    let register_password_lenght = register_password.value.length;
    if (register_password_lenght < 8){
      register_password.classList.add('logon-input-error');
    } else {
      register_password.classList.remove('logon-input-error');
    }

    // verify user data
    if (register_mail_test == true && register_first_name_lenght > 1 && register_last_name_lenght > 1 && register_password_lenght >= 8){

      // save data to localStorage
      let full_name = register_first_name.value + ' ' + register_last_name.value;
      let initials_1 = register_first_name.value.substring(0, 1).toUpperCase();
      let initials_2 = register_last_name.value.substring(0, 1).toUpperCase();
      let initials = initials_1+''+initials_2;
      let bonuses = Math.random(3);
      bonuses = Math.ceil(bonuses*1000);
      let library_card = Math.floor(100000 + Math.random() * 900000);
      library_card = library_card+'999';
      library_card = Number(library_card);
      let library_card_hex = library_card.toString(16);
      library_card_hex = String(library_card_hex).toUpperCase();
      // data array
      const user_data = new Map ([
        ['mail', register_mail.value],
        ['password', register_password.value],
        ['first_name', register_first_name.value],
        ['last_name', register_last_name.value],
        ['full_name', full_name],
        ['initials', initials],
        ['library_card', library_card_hex],
        ['credit_card',''],
        ['visits','1'],
        ['bonuses', bonuses],
        ['books','0'],
        ['titles','0'],
      ]);
      //console.log(user_data);
      const user_data_json = JSON.stringify(Object.fromEntries(user_data));
      //localStorage.setItem('name', 'value');
      localStorage[register_mail.value] = JSON.stringify(user_data_json);

      // change user values on page
      document.getElementById('data_initials_menu').innerHTML = initials;
      document.getElementById('data_initials_profile').innerHTML = initials;
      document.getElementById('data_name_profile').innerHTML = full_name;
      document.getElementById('data_name_dlc').value = full_name;
      document.getElementById('data_visits_profile').innerHTML = '1';
      document.getElementById('data_visits_dlc').innerHTML = '1';
      document.getElementById('data_bonuses_profile').innerHTML = bonuses;
      document.getElementById('data_bonuses_dlc').innerHTML = bonuses;
      document.getElementById('data_books_profile').innerHTML = '0';
      document.getElementById('data_books_dlc').innerHTML = '0';
      document.getElementById('data_cardnumber_menu').innerHTML = library_card;
      document.getElementById('data_cardnumber_profile').innerHTML = library_card;
      document.getElementById('data_cardnumber_hidden').value = library_card;
      document.getElementById('data_cardnumber_dlc').value = library_card;
      document.getElementById('data_titles_profile').innerHTML = '';

      // change menu
      document.getElementById('data_cardnumber_menu').classList.add('small-font');
      document.getElementById('user-menu-noauth').classList.add('hidden-area');
      document.getElementById('user-menu-auth').classList.remove('hidden-area');
      document.getElementById('user-pic-noauth').classList.add('hidden-area');
      document.getElementById('data_initials_title').setAttribute('title', full_name);

      // change layer visibility
      document.getElementById('library-card-left-noauth').classList.add('hidden-area');
      document.getElementById('library-card-left-auth').classList.remove('hidden-area');
      document.getElementById('library-card-right-noauth').classList.add('hidden-area');
      document.getElementById('library-card-right-auth').classList.remove('hidden-area');

      // close modal
      modal_showhide('register');

    }
  }

  // check buy a card form
  else if (toForm == 'card'){

    // card numbert must contain 16 digits w/wo spaces or dashes
    let card_number = document.getElementById('card_number');
    let card_number_test = test_number(card_number.value);
    let card_number_lenght = card_number.value.length;
    // card number with dashes
    let card_number_dashed = card_number.value.search(/-/g);
    let card_number_dashed_lenght = card_number.value.replace(/\D/g,'').length;
    // card number with spaces
    let card_number_spaced = card_number.value.search(/ /g);
    let card_number_spaced_lenght = card_number.value.replace(/\D/g,'').length;
    // number check
    //alert('card_number_lenght='+card_number_lenght+'\n card_number_dashed='+card_number_dashed+'\n card_number_dashed_lenght='+card_number_dashed_lenght+'\n card_number_spaced='+card_number_spaced+'\n card_number_spaced_lenght='+card_number_spaced_lenght+'\n card_number_test='+card_number_test);
    if ((card_number_lenght == 16 || (card_number_dashed == 4 && card_number_dashed_lenght == 16) || (card_number_spaced == 4 && card_number_spaced_lenght == 16)) && card_number_test == true){
      card_number.classList.remove('logon-input-error');
    } else {
      card_number.classList.add('logon-input-error');
    }

    // expiration mohth must contain 2 digits only
    let card_mon = document.getElementById('card_mon');
    let card_mon_test = test_digits(card_mon.value);
    let card_mon_lenght = card_mon.value.length;
    if (card_mon_lenght != 2 || card_mon_test == false){
      card_mon.classList.add('buy-exp-input-error');
    } else {
      card_mon.classList.remove('buy-exp-input-error');
    }

    // expiration year must contain 2 digits only
    let card_year = document.getElementById('card_year');
    let card_year_test = test_digits(card_year.value);
    let card_year_lenght = card_year.value.length;
    if (card_year_lenght != 2 || card_year_test == false){
      card_year.classList.add('buy-exp-input-error');
    } else {
      card_year.classList.remove('buy-exp-input-error');
    }

    // CVC code must contain 3 digits only
    let card_cvc = document.getElementById('card_cvc');
    let card_cvc_test = test_digits(card_cvc.value);
    let card_cvc_lenght = card_cvc.value.length;
    if (card_cvc_lenght != 3 || card_cvc_test == false){
      card_cvc.classList.add('buy-exp-input-error');
    } else {
      card_cvc.classList.remove('buy-exp-input-error');
    }

    // holder name must contain at leat 1 non-space character
    let card_holder = document.getElementById('card_holder');
    let card_holder_lenght = card_holder.value.length;
    if (card_holder_lenght < 1){
      card_holder.classList.add('logon-input-error');
    } else {
      card_holder.classList.remove('logon-input-error');
    }

    // postal code must contain digits only
    let card_postal = document.getElementById('card_postal');
    let card_postal_test = test_digits(card_postal.value);
    let card_postal_lenght = card_postal.value.length;
    if (card_postal_lenght < 1 || card_postal_test == false){
      card_postal.classList.add('logon-input-error');
    } else {
      card_postal.classList.remove('logon-input-error');
    }

    // city must contain at leat 1 non-space character
    let card_city = document.getElementById('card_city');
    let card_city_lenght = card_city.value.length;
    if (card_city_lenght < 1){
      card_city.classList.add('logon-input-error');
    } else {
      card_city.classList.remove('logon-input-error');
    }

    // submit if ok
    if ((card_number_lenght == 16 || (card_number_dashed == 4 && card_number_dashed_lenght == 16) || (card_number_spaced == 4 && card_number_spaced_lenght == 16) && card_number_test == true) && (card_mon_lenght == 2 && card_mon_test == true) && (card_year_lenght == 2 && card_year_test == true) && (card_cvc_lenght == 3 && card_cvc_test == true) && card_holder_lenght > 1 && (card_postal_lenght > 1 && card_postal_test == true) && card_city_lenght > 1){
      //card_form.submit();
    }
  }
}

// test_mail проверка валидности E-mail
function test_mail (toMail) {
  // mail validation regexp
  const mail_regexp = /^[\w-\.]+@[\w-]+\.[a-z]+$/i;
  return mail_regexp.test(toMail);
}

// test_number проверка валидности карты
function test_number (toNum){
  const number_regexp = /^[\d -]+$/i;
  return number_regexp.test(toNum);
}

// test_digits проверка чисел
function test_digits (toDig){
  const digits_regexp = /^[\d]+$/i;
  return digits_regexp.test(toDig);
}

// trim_spaces удаляем ненужные пробелы во всех полях формы
function trim_spaces (toForm){
  let form = document.getElementsByName(toForm+'_form');
  let form_inputs = form[0].getElementsByTagName('input');
  let inputs_total = form[0].getElementsByTagName('input').length;
  console.log('inputs_total='+inputs_total);
  for (let i = 0; i < form_inputs.length; i++) {
    console.log('form_inputs['+i+']='+form_inputs[i].value);
    form_inputs[i].value = form_inputs[i].value.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\s]+/g, ' ');
  }
  return true;
}

// buy_book добавление книг в аккаунт
function buy_book () {

}

// cardnumber_copy копия в буфер
function cardnumber_copy () {
  let hidden_number = document.getElementById('data_cardnumber_hidden').value;
  navigator.clipboard.writeText(hidden_number);
  document.getElementById('cardnumber_copied').innerHTML = 'Copied!';
}

// Library массив книг
const Library = new Map([
  ['1', 'The Book Eater\'s, Sunyi Dean'],
  ['2', 'Cackle, Rachel Harrison'],
  ['3', 'Dante: Poet of the Secular World, Erich Auerbach'],
  ['4', 'The Last Queen,  Clive Irving'],
  ['5', 'The Body, Stephen King'],
  ['6', 'Carry: A Memoir of Survival on Stolen Land, Toni Jenson'],
  ['7', 'Days of Distraction, Alexandra Chang'],
  ['8', 'Dominicana, Angie Cruz'],
  ['9', 'Crude: A Memoir, Pablo Fajardo & Sophie Tardy-Joubert'],
  ['10', 'Let My People Go Surfing, Yvon Chouinard'],
  ['11', 'The Octopus Museum: Poems, Brenda Shaughnessy'],
  ['12', 'Shark Dialogues: A Novel, Kiana Davenport'],
  ['13', 'Casual Conversation, Renia White'],
  ['14', 'The Great Fire, Lou Ureneck'],
  ['15', 'Rickey: The Life and Legend, Howard Bryant'],
  ['16', 'Slug: And Other Stories, Megan Milks'],
]);