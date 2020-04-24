

// Function to display the change menu theme

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

// Change of theme, in day and night mode

const dayButton = document.querySelector('#dayView');
const nightButton = document.querySelector('#nightView');
const estilo = document.querySelector('#ArchivoCss1');
const logo = document.querySelector('#bluegif');
const dayView = document.getElementById('dayView');
const nightView = document.getElementById('nightView');

nightButton.addEventListener('click', ()=>{
    estilo.setAttribute("href", "./Styles/style-dark.css");
    logo.setAttribute("src", "./assets/gifOF_logo_dark.png");
    nightView.innerHTML = '<u>S</u>ailor Night'
    dayView.innerHTML = 'Sailor Day'
})

dayButton.addEventListener('click', ()=>{
    estilo.setAttribute("href", "./Styles/style.css");
    logo.setAttribute("src","./assets/gifOF_logo.png");
    dayView.innerHTML = '<u>S</u>ailor Day'
    nightView.innerHTML = 'Sailor Night'
});


//Functions related to Search

//Suggested search

(function() {
  Sugggested();
  Trends();
})();
function Sugggested(){
  let api_key='Hnx2L1hPH1KOGExTql4qg4hzUF78lwQA';
  let cabecera = new Headers();
  let opciones = {
      method: 'GET',
      //headers: { cabecera },
      mode: 'cors',
      cache: 'default',
  };
  let url = 'https://api.giphy.com/v1/gifs/random?api_key='+api_key+'&tag=&rating=G';
  let result = fetch(url, opciones)
  .then(function(response) {
      return response.json(); 
  })
  .then(function(data) {
      console.log(data);
      makeGifs(data,1);
      return fetch(url, opciones); 
  })
  .then(function(response) {
      return response.json();
  })
  .then(function(data) {
      console.log(data);
      makeGifs(data,2);         
      return fetch(url); 
  })
  .then(function(response) {
      return response.json();
  })
  .then(function(data) {
      console.log(data);
      makeGifs(data,3);           
      return fetch(url); 
  })
  .then(function(response) {
      return response.json();
  })
  .then(function(data) {
      console.log(data);
      makeGifs(data,4);
  })
  .catch(function(error) {
      console.log('Request failed', error)
  })
}

// Get hashtag info

function makeGifs(data,index){
  let nameString = data.data.slug;
  let hashtagArray = nameString.split('-');
  var hashtag = '#';
  for(i=0;i<hashtagArray.length;i++){
      if(i<1 && hashtagArray[i]!=''){
          hashtag +=hashtagArray[i];
      }
  }

// Suggested gif container

  let container = document.getElementById('theContainerSuggest');
      let myDiv = document.createElement("div");
      myDiv.innerHTML = '<div class = "Card">\
      <div class="gifBord">' + hashtag + ' <img class="xIcon" src="./assets/button close.svg"/></div>\
      <input id="trending'+index+'" value="' + hashtag.replace('#','') + '" type="hidden">\
      <div> <img class="imageSugg" src="'+data.data.images.original.url+'"/></div>\
      <button onclick="Busquedas('+index+',1)" class="moreButton">Ver más…</button>\
      </div>'; 
      container.appendChild(myDiv);
}

function makeHash(toDivide) {
  let stringsArray = toDivide.split(" ");
  for (let i=0; i < stringsArray.length; i++) {
      let hashtag = document.createElement("p");
      let text = document.createTextNode("#"+stringsArray[i]);
      hashtag.appendChild(text);
      document.body.appendChild(hashtag);
  }
}


// Trending gifs Function


function Trends(){
  let api_key='Hnx2L1hPH1KOGExTql4qg4hzUF78lwQA';
  let cabecera = new Headers();
  let opciones = {
      method: 'GET',
      //headers: { cabecera },
      mode: 'cors',
      cache: 'default',
  };
  let url='https://api.giphy.com/v1/gifs/trending?api_key='+api_key+'&limit=24&rating=R';
      fetch(url, opciones)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              data.data.forEach(gif => {
                  hashtagAndGif(gif,'trendContainer');
              })
          })
          .catch(function (error) {
              console.log('Error: ' + error);
          })
  }


// Get trends hashtag

let contHash = 0;
function hashtagAndGif(data,containecontainernamer){
  let nameString = data.title;
  let okIndex= nameString.indexOf("GIF");
  let hWithoutGif = nameString.substring(0,okIndex);
  let hashtagArray = hWithoutGif.split(' ');
  let hashtag = '';
  let btnHash=hashtagArray[0];
  for(i=0;i<hashtagArray.length;i++){
      if(i<4 && hashtagArray[i]!=''){
          hashtag +='#'+hashtagArray[i];
      }
  }
  let container = document.getElementById(containecontainernamer);
      let myDiv = document.createElement("div");
      myDiv.innerHTML = '<figure>\
      <img class="Gif" src="'+data.images.original.url+'"/>\
      <figcaption class="muestra">'+hashtag+'</figcaption>\
      </figure>'; 
      container.appendChild(myDiv);
  if(containecontainernamer.includes('myContSearch')){
      if(contHash<=5){
          let container = document.getElementById('buttonContain');
          let myDiv = document.createElement("div");
          myDiv.innerHTML = '<button onclick="Busquedas('+contHash+',2);" class="buttonsSg">#'+btnHash+'<input id="btn-'+contHash+'" value="' + btnHash + '" type="hidden"></button>'; 
          container.appendChild(myDiv);
          contHash ++;
      }
  }
}


// Search function

function Busquedas(action,source){
  let api_key='Hnx2L1hPH1KOGExTql4qg4hzUF78lwQA';
  document.getElementById("myContSearch").innerHTML='';
  contHash = 0;
  let cabecera = new Headers();
  let opciones = {
      method: 'GET',
      //headers: { cabecera },
      mode: 'cors',
      cache: 'default',
  };
  let busqueda = document.getElementById('Busqueda');
  if(typeof action !== 'undefined' && action !='' && isNaN(action)==false && source==1){
      busqueda = document.getElementById('trending'+action);
      document.getElementById('Busqueda').value = busqueda.value;
      document.getElementById('buttonContain').innerHTML='';
  } else if(typeof action !== 'undefined' && action !='' && isNaN(action)==false && source==2){
      busqueda = document.getElementById('btn-'+action);
      document.getElementById('Busqueda').value = busqueda.value;
      document.getElementById('buttonContain').innerHTML='';
  }
  let url='https://api.giphy.com/v1/gifs/search?api_key='+api_key+'&q='+busqueda.value+'&limit=12&offset=0&rating=R&lang=en';
  document.getElementById('buttonContain').innerHTML='';
  fetch(url, opciones)
      .then(function (response) {
          return response.json();
      })
      .then(function (datos) {
          datos.data.forEach(gif => {
              hashtagAndGif(gif,'myContSearch')
          })
      })
      .catch(function (error) {
          console.log('Error: ' + error);
  })
}


