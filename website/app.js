/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = 'dummyKey&units=imperial';

document.getElementById('generate').addEventListener('click', performAction);

/**
 * click listener when user clicks generate button
 */
function performAction () {
    const location = document.getElementById('zip').value;
    getWeather (baseURL, location, apiKey).then(function (data) {
        performActionWrite(data.main.temp);
    })
}

/**
 * return weather data from an external API
 * @param baseURL URL of weather API
 * @param location User define location as ZIP code
 * @param key API-key of openweather
 * @returns {Promise<any>}
 */
const getWeather = async (baseURL, location, key) => {
    const res = await fetch (baseURL + location + "&APPID=" + key )
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error",error);
    }
}

/**
 * post date, temperature and feelings, then call function updateUI
 * @param temperature temperature from openweather
 */
function performActionWrite(temperature) {
    const feelings = document.getElementById('feelings').value;

    // Create a new date instance dynamically with JS
    const d = new Date();
    let newDate = d.toLocaleDateString()
    postData('/add', {date: newDate, temp: temperature,feelings: feelings}).then(updateUI);
}

/**
 * helper function to post data
 * @param url target URL
 * @param data json object to post
 * @returns {Promise<any>}
 */

const postData = async ( url = '', data = {}) => {
    const response = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}


/**
 * retrieve allData with fetch, then looking for ID's and update HTML with informations of allData
 * @returns {Promise<void>}
 */
const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json()
        console.log(allData);
        document.getElementById('temp').innerHTML = 'Temperature: '+ Math.round(allData.temp)+ ' degrees';
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
        document.getElementById('content').innerHTML = 'Your feelings: ' + allData.feelings;
    } catch (error) {
        console.log("error", error);
    }
}
