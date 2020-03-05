/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '113d0473250025e75e2e192f38722a34';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+' /'+ d.getDate()+' /'+ d.getFullYear();

//add Event listener whwn click generate 

document.getElementById('generate').addEventListener('click', performAction);
function performAction (e) {
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    getWeatherData(baseURL+zipCode+'&APPID='+ apiKey).then((data)=>{
        postData('/add', {
            date:newDate , 
            temp:data.main.temp, 
            feeling:content, 
            description:data.weather[0].description
        });
    }).then((newData)=>{
        updateUI();
    })
};

// fetch data from openweathermap //
const getWeatherData = async(url)=>{
    const response = await fetch(url);
    try{
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log('Error', error);
    }
};

// add data to api end point //

const postData = async(url = '', data = {})=>{
    const response = await fetch (url, {
        method:'post',
        credentials:'same-origin',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;

    }
    catch(error){
        console.log('Error', error);
    }
};

// update UI with date , temp, feeling, weather description

const updateUI = async()=>{
    const response = await fetch('/all');
    try{
        const allData = await response.json();
        document.getElementById('date').innerHTML = 'Date: ' + allData[allData.length -1].date;
        document.getElementById('temp').innerHTML = 'Temperature is ' + allData[allData.length -1].temp + 'F';
        document.getElementById('content').innerHTML = "I'm " + allData[allData.length -1].feeling + " today."
        document.getElementById('description').innerHTML = 'Weather Today is ' + allData[allData.length -1].description;
    }
    catch(error){
        console.log('Error', error);
    }
};

