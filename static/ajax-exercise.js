'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then((response) => {
      return response.text();
    })
    .then((fortune) => {
      document.querySelector('#fortune-text').innerHTML = fortune;      
    });

}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json?zipcode=';
  const zipcode = document.querySelector('#zipcode-field').value;
  
  fetch(url + zipcode)
  .then((response) =>{
    return response.json();
  })
  .then((forecast)=>{ // forecast =  {'forecast': 'Rainy, damp, and rich with hipsters.', 'temp': '60F'},
    document.querySelector('#weather-info').innerHTML = forecast['forecast'];
  })

  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS
function orderMelons(evt) {
  
  evt.preventDefault();
  
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  }

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
    'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((orderResponse) => {
    // console.log(responseJson);
    if (orderResponse['code'] === 'ERROR'){
        const error = document.querySelector('#order-status');
        
        error.setAttribute('class', '.order-error');
        error.innerHTML = orderResponse['msg']; // red
    }
    else {
      document.querySelector('#order-status').innerHTML = orderResponse['msg'];

    }
    // normal
      // put responseJson into HTML
  });
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);