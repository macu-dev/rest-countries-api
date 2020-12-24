document.addEventListener("DOMContentLoaded", initApp);
const section = document.getElementById("countries");


function initApp() {
  getCountries();
}

async function getCountries() {
  try {
    const resp = await fetch('https://restcountries.eu/rest/v2/all');
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
        <img class="card-img-top" src="${flag}" alt="Card image of ${name}">
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
















