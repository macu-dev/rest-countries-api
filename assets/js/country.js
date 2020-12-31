

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
  app.loadData();
};

app.template = function({name, population, nativeName}) {
  return `
  <h2 class="w-100">${name}</h2>

  <div class="col-6 pl-0">
    <p>Native Name: <span>${nativeName}</span></p>
    <p>Population: <span>${population}</span></p>
    <p>Region: <span></span></p>
    <p>Sub Region: <span></span></p>
    <p>Capital: <span></span></p>
  </div>

  <div class="col-6">
    <p>Top Level Domain: <span></span></p>
    <p>Currencies: <span></span></p>
    <p>Languages: <span></span></p>
  </div>

  <div class="w-100">
    <p>Border Country: <a></a> </p>
  </div>`;
}

app.loadData = async function(){
  const apiurl = "https://restcountries.eu/rest/v2/name/"
  const eCountryData = document.querySelector("#countryData");
  const eImg = document.querySelector("#countryImg");

  const id = window.location.search.slice(1);

  const countries = await getData(`${apiurl}${id}`);
  const country = countries[0];
  
  console.log(country);

  eImg.src = country.flag;
  eCountryData.innerHTML = app.template(country);

};



window.onload = app.init;