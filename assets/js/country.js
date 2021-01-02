

if (!window.app) window.app = {};

async function getData(path) {
  try {
    const resp = await fetch(path);
    const data = await resp.json(); 
    return data
    
  } catch (error) {
    console.log(error)
  }
}

let app = window.app;

app.init = function() {
  const snipper = document.querySelector(".sk-fading-circle");
  app.loadData();
  snipper.style.display = "none";
};

app.template = async function({name, population, nativeName, region, subregion, capital, currencies, borders, languages, topLevelDomain}) {
  return `
  <h2 class="w-100">${name}</h2>

  <div class="col-6 pl-0">
    <p class="card-text">Native Name: <span>${nativeName}</span></p>
    <p class="card-text">Population: <span>${population}</span></p>
    <p class="card-text">Region: <span>${region}</span></p>
    <p class="card-text">Sub Region: <span>${subregion}</span></p>
    <p class="card-text">Capital: <span>${capital}</span></p>
  </div>

  <div class="col-6">
    <p class="card-text">Top Level Domain: <span>${topLevelDomain[0]}</span></p>
    <p class="card-text">Currencies: <span>${currencies[0].code}</span></p>
    <p class="card-text">Languages: <span>${languages[0].name}</span></p>
  </div>

  <div class="w-100 mb-0 mt-5">
    <p class="font-weight-bold">Border Country: ${(await app.makeButtons(borders)).join("")} </p>
  </div>`;
}


app.parseCodeName = async function(code) {
  const apiurl = "https://restcountries.eu/rest/v2/alpha/";
  const country = await getData(`${apiurl}${code}`);
  return country.name;
};


app.makeButtons = async function(borderCountries) {
  return Promise.all(borderCountries
    .map( async element => {
      const url = `country.html?${await app.parseCodeName(element)}`;
      return  `<a role="button" href="${url}">${element}</a>`;
    })
  )
};

app.loadData = async function(){
  const apiurl = "https://restcountries.eu/rest/v2/name/"
  const eCountryData = document.querySelector("#countryData");
  const eImg = document.querySelector("#countryImg");

  const id = window.location.search.slice(1);

  const countries = await getData(`${apiurl}${id}`);
  const country = countries[0];
  
  console.log(country);

  eImg.src = country.flag;
  eImg.alt = country.name;
  eCountryData.innerHTML = await app.template(country);

};



window.onload = app.init;