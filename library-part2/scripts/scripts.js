// Library
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

// DataText
const DataText = new Map([
  ['data_initials_menu', 'initials'],
  ['data_initials_profile', 'initials'],
  ['data_name_profile', 'full_name'],
  ['data_visits_profile', 'visits'],
  ['data_visits_dlc', 'visits'],
  ['data_bonuses_profile', 'bonuses'],
  ['data_bonuses_dlc', 'bonuses'],
  ['data_books_profile', 'books'],
  ['data_books_dlc', 'books'],
  ['data_cardnumber_menu', 'card_number'],
  ['data_cardnumber_profile', 'card_number'],
  //['data_titles_profile', 'titles'],
]);

// DataValues
const DataValues = new Map([
  ['data_name_dlc', 'full_name'],
  ['data_cardnumber_dlc', 'card_number'],
]);

// DataClasses
const DataClasses = new Map([
  ['user-menu-auth', 'remove'],
  ['user-menu-noauth', 'add'],
  ['pic-user-noauth', 'add'],
  ['library-card-left-noauth', 'add'],
  ['library-card-right-noauth', 'add'],
  ['data_initials_menu', 'remove'],
  ['library-card-left-auth', 'remove'],
  ['library-card-right-auth', 'remove'],
]);

// update data on page load
let user_id = sessionStorage.getItem('user_id');
if (user_id != null){
  update_data (user_id);
}
menu_showhide('hamburger','mobile-menu');
menu_showhide('user','user-menu');
carousel();
slider();

//
// functions
//

// carousel
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
    if (jump > 1){
      car_offset = -1*((jump-1)*475);
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
  //console.log('car_offset='+car_offset+'\n','jump='+jump+'\n','car_width='+car_width+'\n','car_total='+car_total+'\n');
}

// slider
function slider (toSlide){

  let current_season = toSlide;
  let slider_first_run;
  if (typeof current_season == 'undefined'){
    current_season = 'winter'
    slider_first_run = 1;
  }
  const seasons = ['winter', 'spring', 'summer', 'autumn'];

  for (let i = 0; i < seasons.length; i++) {
    let this_slide = document.querySelector('.slider-books-'+seasons[i]);
    if (seasons[i] == current_season){
      // selected slide
      if (slider_first_run == 1){
        this_slide.classList.add('favorites-slide-show');
        this_slide.style.zIndex = '2';
      } else {
        this_slide.classList.remove('favorites-slide-hide');
        setTimeout(() => this_slide.classList.add('favorites-slide-show'), 1000);
        this_slide.style.zIndex = '2';
      }
    } else {
      // all slides
      if (slider_first_run == 1){
        this_slide.style.zIndex = '-1';
        setTimeout(() => this_slide.style.zIndex = '1', 1000);
      } else {
        this_slide.style.zIndex = '1';
      }
      this_slide.classList.remove('favorites-slide-show');
      this_slide.classList.add('favorites-slide-hide');
    }
  }
}

// login
function login (){

  // clear unused spaces
  trim_spaces('login_form');

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

  // search for user in localStorage
  if (login_mail_test == true && login_password_lenght >= 8){

    let user = localStorage.getItem(login_mail.value);
    if (user != null){
      const data_json = JSON.parse(localStorage.getItem(login_mail.value));
      const user_data = new Map(Object.entries(data_json));
      let user_password = user_data.get('password');

      if (login_password.value == user_password){

        // password ok
        const user_card_number = user_data.get('card_number');
        const user_card_buyed = user_data.get('card_buyed');
        let user_visits = user_data.get('visits');
        user_visits++;

        //save session
        sessionStorage.setItem('user_id', login_mail.value);
        sessionStorage.setItem('user_card_number', user_card_number);
        sessionStorage.setItem('user_card_buyed', user_card_buyed);
        user_data.set('visits',user_visits);

        // save data to localStorage
        const new_data_json = JSON.stringify(Object.fromEntries(user_data));
        localStorage[login_mail.value] = new_data_json;

        // get all data and change page values
        update_data(login_mail.value);

        // close modal
        modal_hide('login');

      } else {
        // password not ok
        login_password.classList.add('logon-input-error');
      }
    } else {
      // login not ok
      login_mail.classList.add('logon-input-error');
    }
  }
}

// registration
function register (){

  // clear unused spaces
  trim_spaces('register_form');

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

    // prepare data
    let full_name = register_first_name.value + ' ' + register_last_name.value;
    let initials_1 = register_first_name.value.substring(0, 1).toUpperCase();
    let initials_2 = register_last_name.value.substring(0, 1).toUpperCase();
    let initials = initials_1+''+initials_2;
    let bonuses = Math.random(3);
    bonuses = Math.ceil(bonuses*1000);
    let library_card = Math.floor(100000 + Math.random() * 900000);
    library_card = library_card+'99999';
    library_card = Number(library_card);
    let library_card_hex = library_card.toString(16);
    library_card_hex = library_card_hex.substring(0, 9);
    library_card_hex = String(library_card_hex).toUpperCase();

    // data array
    const user_data = new Map ([
      ['mail', register_mail.value],
      ['password', register_password.value],
      ['first_name', register_first_name.value],
      ['last_name', register_last_name.value],
      ['full_name', full_name],
      ['initials', initials],
      ['card_buyed', 0],
      ['card_number', library_card_hex],
      ['visits', 1],
      ['bonuses', bonuses],
      ['books', 0],
      ['titles', ''],
    ]);

    // save data to localStorage
    const user_data_json = JSON.stringify(Object.fromEntries(user_data));
    localStorage[register_mail.value] = user_data_json;

    // save current session
    sessionStorage.setItem('user_id', register_mail.value);
    sessionStorage.setItem('user_card_number', library_card_hex);
    sessionStorage.setItem('user_card_buyed', '0');

    // get all data and change page values
    update_data(register_mail.value);

    // close modal
    modal_hide('register');

  }
}

// buy a library card
function buy_card (){

  // clear unused spaces
  trim_spaces('card_form');

  // card numbert must contain 16 digits w/wo spaces
  let card_number = document.getElementById('card_number');
  let card_number_test = test_number(card_number.value);
  let card_number_lenght = card_number.value.length;
  // card number with spaces
  let card_number_spaced = card_number.value.search(/ /g);
  let card_number_spaced_lenght = card_number.value.replace(/\D/g,'').length;
  // number check
  if ((card_number_lenght == 16 || (card_number_spaced == 4 && card_number_spaced_lenght == 16)) && card_number_test == true){
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

  // verify user data
  if ((card_number_lenght == 16 || (card_number_spaced == 4 && card_number_spaced_lenght == 16) && card_number_test == true) && (card_mon_lenght == 2 && card_mon_test == true) && (card_year_lenght == 2 && card_year_test == true) && (card_cvc_lenght == 3 && card_cvc_test == true) && card_holder_lenght > 1 && (card_postal_lenght > 1 && card_postal_test == true) && card_city_lenght > 1){

    // get data from localStorage
    let user_id = sessionStorage.getItem('user_id');
    const data_json = JSON.parse(localStorage.getItem(user_id));
    const user_data = new Map(Object.entries(data_json));
    user_data.set('card_buyed', 1);

    // save data to localStorage
    const new_data_json = JSON.stringify(Object.fromEntries(user_data));
    localStorage[user_id] = new_data_json;

    // save current session
    sessionStorage.setItem('user_card_buyed', 1);

    // close modal
    modal_hide('buy');
  }
}

// check library card
function check_card (){

  // check user registration
  let user_id = sessionStorage.getItem('user_id');
  if (user_id == null){

    // clear unused spaces
    trim_spaces('reader_form');

    // name must contain at leat 3 non-space character
    let reader_name = document.getElementById('data_name_dlc');
    let reader_name_lenght = reader_name.value.length;
    if (reader_name_lenght < 3){
      reader_name.classList.add('logon-input-error');
    } else {
      reader_name.classList.remove('logon-input-error');
    }

    // card number must contain 9 hex digits only
    let reader_card = document.getElementById('data_cardnumber_dlc');
    let reader_card_test = test_hex(reader_card.value);
    let reader_card_lenght = reader_card.value.length;
    if (reader_card_lenght != 9 || reader_card_test == false){
      reader_card.classList.add('logon-input-error');
    } else {
      reader_card.classList.remove('logon-input-error');
    }

    // verify user data
    if (reader_card_test == true && reader_card_lenght == 9 && reader_name_lenght > 3){

      // search whole localStorage
      for (let i = 0, length = localStorage.length; i < length; i++) {
        let key = localStorage.key(i);
        let value = localStorage[key];
        let data_json = JSON.parse(value);
        let user_data = new Map(Object.entries(data_json));
        let user_id = user_data.get('mail');
        let user_fullname = user_data.get('full_name');
        let user_card_number = user_data.get('card_number');

        if (reader_name.value == user_fullname && reader_card.value == user_card_number){

          // update data
          document.getElementById('data_visits_dlc').textContent = user_data.get('visits');
          document.getElementById('data_bonuses_dlc').textContent = user_data.get('bonuses');
          document.getElementById('data_books_dlc').textContent = user_data.get('books');
          document.getElementById('library-card-left-auth').classList.remove('hidden-area');
          document.getElementById('library-card-left-noauth').classList.add('hidden-area');

          // close and clear data by timeout
          setTimeout(function () {
            document.getElementById('library-card-left-auth').classList.add('hidden-area');
            document.getElementById('library-card-left-noauth').classList.remove('hidden-area');
            document.getElementById('data_name_dlc').value = '';
            document.getElementById('data_cardnumber_dlc').value = '';
          }, 10000);

        }
      }
    }
  }
}

// buy book
function buy_book (toBook) {

  let book_id = toBook;
  book_id = book_id.replace(/\D/g,'');

  // check user login and buyed card
  let user_id = sessionStorage.getItem('user_id');
  let user_card_buyed = sessionStorage.getItem('user_card_buyed');
  if (user_id == null){

    // goto autorisation
    modal_show('login');

  } else if (user_card_buyed == 0){

    // goto library card
    modal_show('buy');

  } else {

    // get data from localStorage
    const data_json = JSON.parse(localStorage.getItem(user_id));
    const user_data = new Map(Object.entries(data_json));
    let user_titles =  user_data.get('titles');
    let books_count =  user_data.get('books');
    let new_titles;
    if (user_titles != ''){
      new_titles = user_titles+';'+book_id;
    } else {
      new_titles = book_id;
    }
    books_count++;
    user_data.set('books',books_count);
    user_data.set('titles',new_titles);

    // save data to localStorage
    const new_data_json = JSON.stringify(Object.fromEntries(user_data));
    localStorage[user_id] = new_data_json;

    // change book state
    document.querySelector('.book-id-'+book_id).classList.add('button-disabled');
    document.querySelector('.book-id-'+book_id).textContent = 'Own';
    document.querySelector('.book-id-'+book_id).setAttribute('disabled','');

    // update user data
    update_data (user_id);

  }
}

// logout
function logout() {
  let user = sessionStorage.getItem('user_id');
  if (user != null){
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_card_number');
    sessionStorage.removeItem('user_card_buyed');

    // clear user text
    DataText.forEach((value, key, map) => {
      document.getElementById(`${key}`).textContent = '';
    });

    // clear user values
    DataValues.forEach((value, key, map) => {
      document.getElementById(`${key}`).value = '';
    });

    // reset book buy button state
    let buttons = document.getElementsByClassName('book-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('button-disabled');
      buttons[i].textContent = 'Buy';
      buttons[i].removeAttribute('disabled');
    }

    // reset classes
    let class_action;
    DataClasses.forEach((value, key, map) => {
      class_action = `${value}`;
      if (class_action == 'add'){
        document.getElementById(`${key}`).classList.remove('hidden-area');
      } else{
        document.getElementById(`${key}`).classList.add('hidden-area');
      }
    });

    // change menu
    document.getElementById('data_initials_title').removeAttribute('title');

  }
}

// update data
function update_data (toId) {
  const user_id = toId;
  const data_json = JSON.parse(localStorage.getItem(user_id));
  const user_data = new Map(Object.entries(data_json));

  // update data text
  DataText.forEach((value, key, map) => {
    document.getElementById(`${key}`).textContent = user_data.get(`${value}`);
  });

  // update data values
  DataValues.forEach((value, key, map) => {
    document.getElementById(`${key}`).value = user_data.get(`${value}`);
  });

  // update classes
  let class_action;
  DataClasses.forEach((value, key, map) => {
    class_action = `${value}`;
    if (class_action == 'add'){
      document.getElementById(`${key}`).classList.add('hidden-area');
    } else{
      document.getElementById(`${key}`).classList.remove('hidden-area');
    }
  });

  // change menu
  document.getElementById('data_initials_title').setAttribute('title', user_data.get('full_name'));
  document.getElementById('data_cardnumber_menu').classList.add('small-font');

  // change buy button state
  let book_buttons = document.getElementsByName('book-button');
  let user_titles = user_data.get('titles');
  let books = user_titles.split(';');
  if (books != ''){
    let book_id;
    let rented_books = '';
    for (let i = 0; i < books.length; i++) {
      document.querySelector('.book-id-'+books[i]).classList.add('button-disabled');
      document.querySelector('.book-id-'+books[i]).textContent = 'Own';
      document.querySelector('.book-id-'+books[i]).setAttribute('disabled','');
      // rented book
      rented_books = rented_books + '<li>' + Library.get(books[i]) + '</li>';
    }

    // rented books list
    document.getElementById('data_titles_profile').innerHTML = rented_books;

  }
}

//
// subroutines
//

// show objects
function show(toShow) {
	var t_show = document.querySelector('.' + toShow);
  t_show.style.display = 'block';
}

// hide objects
function hide(toHide) {
	var t_hide = document.querySelector('.' + toHide);
  t_hide.style.display = 'none';
}

// show / hide objects
function showhide(toShow) {
  var t_show = document.querySelector("." + toShow);
  if(t_show.style.display == "none" || t_show.style.display == "") {
    t_show.style.display = "block";
  } else {
    t_show.style.display = "none";
  }
}

// menu showhide
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

// menu show
function menu_show(toMenu) {
  let h_menu = document.querySelector('.'+toMenu);
  h_menu.classList.add(toMenu+'__open');
}

// menu hide
function menu_hide(toMenu) {
  let h_menu = document.querySelector('.'+toMenu);
  h_menu.classList.remove(toMenu+'__open');
}

// modal show
function modal_show (toModal){
  show('modal-wrapper');
  show('modal-'+toModal);
}

// modal hide
function modal_hide (toModal){
  hide('modal-wrapper');
  hide('modal-'+toModal);
}

// modal window showhide
function modal_showhide (toModal){
  showhide('modal-wrapper');
  showhide('modal-'+toModal);
}

// modal window switch
function modal_switch (fromModal,toModal){
  hide('modal-'+fromModal);
  show('modal-'+toModal);
}

// close all
function modal_close (){
  const modals = ['login', 'register', 'profile', 'buy'];
  for (let i = 0; i < modals.length; i++) {
    hide('modal-'+modals[i]);
  }
  hide('modal-wrapper');
}

// card number copy
function cardnumber_copy () {
  let user_card = sessionStorage.getItem('user_card_number');
  navigator.clipboard.writeText(user_card);
  document.getElementById('cardnumber_copied').textContent = 'Copied!';
}

// trim unused spaces
function trim_spaces (toForm){
  let form = document.getElementsByName(toForm);
  let form_inputs = form[0].getElementsByTagName('input');
  let inputs_total = form[0].getElementsByTagName('input').length;
  for (let i = 0; i < form_inputs.length; i++) {
    //console.log('form_inputs['+i+']='+form_inputs[i].value);
    form_inputs[i].value = form_inputs[i].value.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/[\s]+/g, ' ');
  }
  return true;
}

// test mail
function test_mail (toMail) {
  // mail validation regexp
  const mail_regexp = /^[\w-\.]+@[\w-]+\.[a-z]+$/i;
  return mail_regexp.test(toMail);
}

// test number
function test_number (toNum){
  const number_regexp = /^[\d -]+$/i;
  return number_regexp.test(toNum);
}

// test digits
function test_digits (toDig){
  const digits_regexp = /^[\d]+$/i;
  return digits_regexp.test(toDig);
}

// test hexadecimal
function test_hex (toHex) {
  const hex_regexp = /^[0-9A-F]+$/i;
  return hex_regexp.test(toHex);
}
