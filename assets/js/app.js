import Swal from '/node_modules/sweetalert2/src/sweetalert2.js'

document.addEventListener("DOMContentLoaded", initApp);
const section = document.getElementById("countries");
const form = document.querySelector("form");
const options = document.getElementById("options-region");
form.addEventListener('submit', validation);
options.addEventListener('change', (e) => {
  if(e.target.value == 'Filter by Region') {
    initApp();
  }else {
    getCountries(`https://restcountries.eu/rest/v2/region/${e.target.value}`);
  }
})


function initApp() {
  getCountries("https://restcountries.eu/rest/v2/all");
}

async function getCountries(path) {
  try {
    const resp = await fetch(path);
    const countries = await resp.json(); 
    section.innerHTML = drawCountries(countries);
    
  } catch (error) {
    console.log(error)
  }
}

function drawCard ({name,population,region,capital,flag}) {
  return `
    <div class="col-3">
      <article class="card shadow w-100">
        <figure class="w-100 mb-0 card__item">
          <img class="card-img-top h-100" src="${flag}" alt="Card image of ${name}">
        </figure>
        <header class="card-body">
          <h2 class="card-title">${name}</h2>
          <p class="card-text">Population: <span>${population}</span></p>
          <p class="card-text">Region: <span>${region}</span></p>
          <p class="card-text">Capital: <span>${capital}</span></p>
        </header>
      </article>
    </div>
  `;  
}

function drawCountries(countries) {
  let template ='';

  for (let i=0; i<countries.length/4; i++){
    template+= `<div class="row mt-5">`;
   
   for(let j=0; 4*i+j< countries.length && j< 4; j++){
     template+= drawCard(countries[4*i+j]);
   }
   template+=`</div>`;
  }

  return template;
}
function validation(e) {
  e.preventDefault();
  const nameCountry = document.getElementById("search-country").value;
  const isNumber = /^[0-9]+$/;
  const isString = /^[A-Z]+$/i;
  let isValid = true;

  if(isNumber.test(nameCountry) || !isString.test(nameCountry)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error en el llenado, por favor vuelva a ingresar'
    })

    form.reset();
    isValid = false;
  }

  if(nameCountry === '') {
    initApp();
    isValid = false;
  }

  if(isValid) {
    displayMatches(nameCountry);
  }
  
}

async function displayMatches(country) {
  try {
    const resp = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const matches = await resp.json(); 
    if(matches.status == 404) {
      const errorMessage = `<h2 class="text-center message-error">No se encontraron resultados</h2>`;
      section.innerHTML = errorMessage; 
    }else{
      section.innerHTML = drawCountries(matches);
    }
    
  } catch (err) {
    console.log(err);
  }
}


















