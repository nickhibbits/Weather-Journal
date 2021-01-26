/* Global Variables */
// let baseURL = 'api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=cf671a0e6004b23e0fa755be924ec763';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Do the following when the generate button is clicked
document.getElementById('generate').addEventListener('click', performAction);

// GET weather info from API then POST that info, along with user's entry, to the site
function performAction(e){
  let newZip = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;
  getWeather(baseURL, newZip, apiKey)
  .then(function(data){
    console.log(data)
    postData('/add', {temperature:data.main.temp, date:newDate, entry:feelings});
    update();
  })
}

// Update UI
const update = async()=>{
  const request = await fetch('/updatePage');
  try{
  const allData = await request.json();
  console.log(allData);
  document.getElementById('temp').innerHTML = allData['entry'].temperature;
  document.getElementById('date').innerHTML = allData['entry'].date;
  document.getElementById('content').innerHTML = allData['entry'].entry;
  }
  catch(error){
  console.log("error", error);
  }
}
// Access the OpenWeather API to get local weather data based on the zip code
const getWeather = async (baseURL, zip, key)=>{
  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
}

// POST request to grab data returned from OpenWeather API
const postData = async (url = '', newInfo = {})=>{
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(newInfo),
    });
      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }
      catch(error) {
      console.log("error", error);
      }
}
