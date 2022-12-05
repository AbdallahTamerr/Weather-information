/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const button = document.getElementById("generate");
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=be631d95e89ad31006b2543b5cbe166b&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);


//function that doing all the requirements
const mainFunction = async function () {
//waiting for the zipcode form to be filled
const zipCode = await document.getElementById("zip").value;
//get the endpoint data using fetch
const fetching = await fetch(baseURL+zipCode+apiKey);
const apiResult = await fetching.json();
try{
//this code is for saving the data in the database(in this case the "projectData" object)
await fetch('/saveData',{
  method: 'POST', 
credentials: 'same-origin',
headers: {
    'Content-Type': 'application/json',
},        
body: JSON.stringify({
  date: newDate,
  temp: apiResult.main.temp,
  feeling: document.querySelector(".myInput").value
})
});
// this code is for getting the data saved in the "projectData" object to use it to update the UI.
const dataSaved = await fetch('/showData',{ credentials: 'same-origin'});
const savedProjectData = await dataSaved.json();
console.log(savedProjectData);
//these codes are for update the UI
document.querySelector("#entryHolder").innerHTML= 'The weather information';
document.querySelector("#date").innerHTML= 'Date: ' + savedProjectData.date;
document.querySelector("#temp").innerHTML= `Temp: ${savedProjectData.temp} degrees`;
document.querySelector("#content").innerHTML= `Feeling: ${savedProjectData.feeling}`;
document.querySelector(".error").innerHTML= "";
}catch(error){
    console.log(error,"error");
//I added this part to ask the user to add a valid zip code in case the user pressed the generate button without entering a valid data.
    document.querySelector(".error").innerHTML= "Please enter valid zip code.";
}
}
//the main function will work after clicking the generate button.
button.addEventListener("click", mainFunction);