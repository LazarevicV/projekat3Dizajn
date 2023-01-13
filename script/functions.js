
class ClanTeretane {
  id
  ime_prezime
  godina_rodjenja
  email
  vrsta_clana
  clanarina

  constructor(id, ime_prezime, godina_rodjenja, email, vrsta_clana, clanarina) {
    this.id = id;
    this.ime_prezime = ime_prezime;
    this.godina_rodjenja = godina_rodjenja;
    this.email = email;
    this.vrsta_clana = vrsta_clana;
    this.clanarina = clanarina;
  }
}

var c1 = new ClanTeretane(1, 'Mile Kitic', 1950, 'mile.kitic@gmail.com', 'regularni', 3000)

var c2 = new ClanTeretane(2, 'Era Ojdanic', 1960, 'era.ojdanic@gmail.com', 'povlasceni', 2400)

var c3 = new ClanTeretane(3, 'Saban Saulic', 1955, 'saban.saulic@gmail.com', 'regularni', 3000)

var niz_clanova = [c1, c2, c3];
const originalni_niz_clanova = [c1, c2, c3]
console.log(niz_clanova);

if (localStorage.getItem('niz') == undefined) {
  localStorage.setItem('niz', JSON.stringify(niz_clanova))
}
else {
  niz_clanova = JSON.parse(localStorage.getItem('niz'))
}

var svi_clanovi;

function dodaj_u_niz() {
  var id = document.getElementById('id').value;
  var ime_prezime = document.getElementById('ime_prezime').value;
  var godina_rodjenja = document.getElementById('godina_rodjenja').value;
  var email = document.getElementById('email').value;
  
  var vrsta_clana = document.getElementsByName('vrsta_clana')
  var chekiran
  for (var i = 0; i < vrsta_clana.length; i++) {
    if (vrsta_clana[i].checked)
      chekiran = vrsta_clana[i].value
  }
  console.log(chekiran)
  var clanarina = 3000
  if (chekiran == 'povlasceni') {
    clanarina = 3000 - (3000*0.2) // 20 #
  }

  // Kreiraj novi objekat tipa ClanTeretane
  var trenutni_clan = new ClanTeretane(id, ime_prezime, godina_rodjenja, email, chekiran, clanarina);

  // Dodaj novi objekat u niz
  niz_clanova.push(trenutni_clan);

  // Ažuriraj podatke u local storage-u
  localStorage.setItem('niz', JSON.stringify(niz_clanova));
}

var tabela = document.getElementById('tabela')

function ispisi_sve_clanove(niz_clanova) {
  var brojac = 0
  for (const clan of niz_clanova) {
    tabela.innerHTML += `
    <tr>
      <th>${clan.id}</th>
      <th>${clan.ime_prezime}</th>
      <th>${clan.godina_rodjenja}</th>
      <th>${clan.email}</th>
      <th>${clan.vrsta_clana}</th>
      <th>${clan.clanarina}</th>
      <th id="delete_${brojac}">Delete</th>
      <th id="update_${brojac}">Update</th>
    </tr> 
    `
    brojac++;
  }
}

// proverava da li su svi parametri novog clana dobri, ako jesu vraca
// true a ako nisu vraca false
function proveri_podatke() {
  // ucitavanje unetih podataka
  var id = document.getElementById('id').value
  var ime_prezime = document.getElementById('ime_prezime').value
  var godina_rodjenja = document.getElementById('godina_rodjenja').value
  var email = document.getElementById('email').value
  // console.log(id, ime_prezime, godina_rodjenja, vrsta_clana, clanarina)
  
  var greska = document.getElementById('greska')
  var greska_ime_prezime = document.getElementById('greska_ime_prezime')
  var greska_godina_rodjenja = document.getElementById('greska_godina_rodjenja')
  var greska_email = document.getElementById('greska_email')
  var greska_id = document.getElementById('greska_id')
  
  if (id == '' || ime_prezime == '' || godina_rodjenja == '') {
    
    greska.innerText = 'Svi podaci moraju biti popunjeni!'
    return false
  }
  greska.innerText = ''

  for (const clan of niz_clanova) {
    if (clan.id == id) {
      greska_id.innerText = 'id mora biti nepostojeci!'
      return false 
    }
  }
  greska_id.innerText = ''
  
  if (ime_prezime.length < 2) {
    greska_ime_prezime.innerText = 'Ime i prezime moraju imati bar 2 karaktera'
    return false 
  }
  greska_ime_prezime.innerText = ''

  if (godina_rodjenja < 0 || godina_rodjenja > 2023) {
    greska_godina_rodjenja.innerText = 'Godina rodjenja mora biti > 0 i < 2023'
    return false 
  }
  greska_godina_rodjenja.innerText = ''

  if (!email.includes('@')) {
    greska_email.innerText = 'email mora imati @!'
    return false 
  }
  greska_email.innerText = ''

  return true
}

// console.log(proveri_podatke());

var dodaj_button = document.getElementById('dodaj_button')
var tajmer = document.getElementById('tajmer')

// kada se doda novi, pokrece se tajmer, a ova funkcija pokrece input box za taj tajmer
function dodaj_input_box_tajmer(tajmer_unos) {
  try {
    tajmer_unos.classList.remove('display_none')
  } catch {}
  tajmer_unos.classList.add('display_block')
}

// postavljamo display_none za input_box kada je gotov tajmer
function postavi_display_none_za_input_box_tajmer(input_tajmer) {
  try {
    input_tajmer.classList.remove('display_block')
  } catch {}
  input_tajmer.classList.add('display_none')
}

function generisi_rendom_operaciju() {
  var prvi_broj = Math.floor(Math.random() * 10) +1
  // console.log(prvi_broj);
  var drugi_broj = Math.floor(Math.random() * 10) +1
  // console.log(drugi_broj);
  const znaci = ['+', '-', '/', '*']
  const rendom_indeks = Math.floor(Math.random() * znaci.length)
  znak_operacije = znaci[rendom_indeks]
  rezultat = 0
  if (znak_operacije == '+') {
    rezultat = prvi_broj + drugi_broj
    console.log('+');
    console.log(`${prvi_broj} ${znak_operacije} ${drugi_broj}`);
    return [rezultat, `${prvi_broj} ${znak_operacije} ${drugi_broj}`]
  }
  else if (znak_operacije == '-') {
    if (drugi_broj > prvi_broj) {
      let pomocna = drugi_broj
      drugi_broj = prvi_broj
      prvi_broj = pomocna
      rezultat = prvi_broj - drugi_broj
      console.log('-');
      console.log(`${prvi_broj} ${znak_operacije} ${drugi_broj}`);
      return [rezultat, `${prvi_broj} ${znak_operacije} ${drugi_broj}`]
    }
    rezultat = prvi_broj - drugi_broj
    console.log('-');
    console.log(`${prvi_broj} ${znak_operacije} ${drugi_broj}`);
    return [rezultat, `${prvi_broj} ${znak_operacije} ${drugi_broj}`]
  }
  else if (znak_operacije == '/') {
    if (drugi_broj > prvi_broj) {
      let pomocna = drugi_broj
      drugi_broj = prvi_broj
      prvi_broj = pomocna
      rezultat = prvi_broj / drugi_broj
      rezultat = parseInt(rezultat)
      console.log('/');
      console.log(`${prvi_broj} ${znak_operacije} ${drugi_broj}`);
      return [rezultat, `${prvi_broj} ${znak_operacije} ${drugi_broj}`]
    }
    rezultat = prvi_broj/drugi_broj
    rezultat = parseInt(rezultat)
    console.log('/');
    console.log(`${prvi_broj} ${znak_operacije} ${drugi_broj}`);
    return [rezultat, `${prvi_broj} ${znak_operacije} ${drugi_broj}`]
  }
  else if (znak_operacije == '*') {
    rezultat = prvi_broj * drugi_broj
    console.log('*');
    console.log(`${prvi_broj} ${znak_operacije} ${drugi_broj}`);
    return [rezultat, `${prvi_broj} ${znak_operacije} ${drugi_broj}`]
  }
}

function prikazi_operaciju(operacija_tajmer) {
  try {
    operacija_tajmer.classList.remove('display_none')
  } catch {}
  operacija_tajmer.classList.add('display_block')
}

function sakrij_operaciju(operacija_tajmer) {
  try {
    operacija_tajmer.classList.remove('display_block')
  } catch {}
  operacija_tajmer.classList.add('display_none')
}

function proveri_unos_nakon_tajmera(rezultat) {
  var unesena_vrednost = document.getElementById('tajmer_unos').value
  console.log(unesena_vrednost);
  if (unesena_vrednost == rezultat){
    console.log(false);
    return true 
  }
  else {
    console.log(true);
    return false
  }
}

function prikazi_potvrdi_dugme(potvrdi_unos_tajmer) {
  try {
    potvrdi_unos_tajmer.classList.remove('display_none')
  } catch {}
  potvrdi_unos_tajmer.classList.add('display_block')
}

function sakrij_potvrdi_dugme(potvrdi_unos_tajmer) {
  try {
    potvrdi_unos_tajmer.classList.remove('display_block')
  } catch {}
  potvrdi_unos_tajmer.classList.add('display_none')
}


var trenutni_clan

// dodaje tajmer kada se klikne dugme dodaj novog clana
dodaj_button.addEventListener('click', (e) => {
  e.preventDefault()
  try {
    tajmer.classList.remove('display_none')
  } catch {}
  if (proveri_podatke()) {
    console.log('test');
    var tajmer_unos = document.getElementById('tajmer_unos')
    tajmer_unos.value = ''
    dodaj_input_box_tajmer(tajmer_unos)
    var myInterval = setInterval(myTimer, 1000);
    var operacija_tajmer = document.getElementById('operacija_tajmer')
    lista_iz_rendom_funkcije = generisi_rendom_operaciju()
    operacija_tajmer.innerText = lista_iz_rendom_funkcije[1]
    var rezultat = lista_iz_rendom_funkcije[0]
    console.log(rezultat);
    console.log(lista_iz_rendom_funkcije);
    prikazi_operaciju(operacija_tajmer)
    var potvrdi_unos_tajmer = document.getElementById('potvrdi_unos_tajmer')
    prikazi_potvrdi_dugme(potvrdi_unos_tajmer)
    
    var greska_potvrdi_tajmer = document.getElementById('greska_potvrdi_tajmer')
    console.log('test');
    greska_potvrdi_tajmer.innerText = ''
    potvrdi_unos_tajmer.addEventListener('click', (e) => {
      e.preventDefault()
      var potvrdi_input = document.getElementById('tajmer_unos')
      potvrdi_input.innerText = ''
      console.log(rezultat)
      console.log('pozvana funkcija');
      if (proveri_unos_nakon_tajmera(rezultat)) {
        console.log(proveri_unos_nakon_tajmera(rezultat));
        console.log('true');
        dodaj_u_niz()
        location.reload()
      }
      else {    
        greska_potvrdi_tajmer.innerText = 'Odgovor je netacan!'
      }
    })

    var i = 30;
    function myTimer() {
      document.getElementById("tajmer").innerHTML = i;
      if (i == -1) {
        clearInterval(myInterval)
        try {
          tajmer.classList.remove('display_block')
        } catch {}
        tajmer.classList.add('display_none')
        tajmer.innerText = ''
        postavi_display_none_za_input_box_tajmer(tajmer_unos)
        sakrij_operaciju(operacija_tajmer)
        sakrij_operaciju(potvrdi_unos_tajmer)
        greska_potvrdi_tajmer.innerText = ''
      }
      i--;
    }
  }
})
console.log(niz_clanova)

ispisi_sve_clanove(niz_clanova)
// console.log(trenutni_clan);

const deleteButtons = document.querySelectorAll("[id^='delete_']");

deleteButtons.forEach(button => {
  button.addEventListener("click", event => {
    // Pronađite roditeljski div člana koji treba da se obriše
    const memberDiv = event.target.parentNode;

    // Uklonite div sa stranice
    memberDiv.remove();
    obrisi_id = event.target
    console.log(obrisi_id)
    var id_clan = event.target.id.split('_')[1]
    niz_clanova.splice(id_clan, 1)
    if (niz_clanova.length === 0) {
      localStorage.setItem('niz', JSON.stringify(originalni_niz_clanova))
      niz_clanova = originalni_niz_clanova
      location.reload()
    }
    else {
      localStorage.setItem('niz', JSON.stringify(niz_clanova))
      location.reload()
    }
  });
});

var pozicija = 0

const updateButtons = document.querySelectorAll("[id^='update_']")

updateButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault()
    var dodaj_novi_dugme = document.getElementById('dodaj_button')
    dodaj_novi_dugme.style.display = 'none'
    var update_button = document.getElementById('updajtuj_dugme')
    update_button.classList.remove('display_none')
    var update_cancel = document.getElementById('update_cancel')
    update_cancel.classList.remove('display_none')
    update_id = event.target
    pozicija = parseInt(update_id.id.split('_')[1])
    console.log(pozicija);
    izabrani_clan = niz_clanova[pozicija]

    console.log(izabrani_clan);
    var id = document.getElementById('id')
    id.setAttribute('disabled','')
    id.setAttribute('value', izabrani_clan.id)
    
    var ime_prezime = document.getElementById('ime_prezime')
    ime_prezime.setAttribute('value', izabrani_clan.ime_prezime)

    var godina_rodjenja = document.getElementById('godina_rodjenja')
    godina_rodjenja.setAttribute('value', izabrani_clan.godina_rodjenja)

    var email = document.getElementById('email')
    email.setAttribute('value', izabrani_clan.email)
    
    var regularni_radio_button = document.getElementById('vrsta_clana_regularni')
    var povlasceni_radio_button = document.getElementById('vrsta_clana_povlasceni')
    console.log(regularni_radio_button, povlasceni_radio_button)
    console.log(izabrani_clan.vrsta_clana);
    if (izabrani_clan.vrsta_clana == 'povlasceni') {
      console.log('izabrani_clan.vrsta_clana jeste povlasceni');
      povlasceni_radio_button.checked = true
      regularni_radio_button.checked = false
    }
    else 
      {
        console.log('izabrani_clan.vrsta_clana jeste regularni');
        regularni_radio_button.checked = true 
        povlasceni_radio_button.checked = false 
      }
  })
})

update_button = document.getElementById('updajtuj_dugme')
update_button.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(pozicija)
  var dodaj_novi_dugme = document.getElementById('dodaj_button')
  var ime_prezime = document.getElementById('ime_prezime').value
  niz_clanova[pozicija].ime_prezime = ime_prezime

  var godina_rodjenja = document.getElementById('godina_rodjenja').value
  niz_clanova[pozicija].godina_rodjenja = godina_rodjenja

  var email = document.getElementById('email').value
  niz_clanova[pozicija].email = email 

  var regularni_radio_button = document.getElementById('vrsta_clana_regularni')
  var povlasceni_radio_button = document.getElementById('vrsta_clana_povlasceni')

  if (regularni_radio_button.checked) {
    niz_clanova[pozicija].vrsta_clana = 'regularni'
    niz_clanova[pozicija].clanarina = 3000
  }
  else if (povlasceni_radio_button.checked) {
    niz_clanova[pozicija].vrsta_clana = 'povlasceni'
    niz_clanova[pozicija].clanarina = 3000 - (3000*0.2)
  }

  dodaj_novi_dugme.style.display = 'block'

  localStorage.setItem('niz', JSON.stringify(niz_clanova))
  location.reload()

})

var update_cancel = document.getElementById('update_cancel')
update_cancel.addEventListener('click', (e) => {
  e.preventDefault()
  location.reload()
})

console.log(niz_clanova);