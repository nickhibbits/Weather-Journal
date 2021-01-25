/* Global Variables */
// let baseURL = 'api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=cf671a0e6004b23e0fa755be924ec763';
let feelings = document.getElementById('feelings').value;

// Do the following when the generate button is clicked
document.getElementById('generate').addEventListener('click', performAction);

// GET weather info from API then POST that info, along with user's entry, to the site
function performAction(e){
  let newZip = document.getElementById('zip').value;
  getWeather(baseURL, newZip, apiKey)
  .then(function(data){
    console.log(data)
    postData('', {temperature:data.temperature, date:data.date, entry:feelings});
  });
}

// Access the OpenWeather API to get local weather data based on the zip code
const getWeather = async (baseURL, zip, key)=>{
  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
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

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
