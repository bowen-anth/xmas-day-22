// // const express = require('express'); //Import the express dependency
// // const app = express();              //Instantiate an express app, the main work horse of this server
// // const port = 8080;                  //Save the port number where your server will be listening

// // //Idiomatic expression in express to route and respond to a client request
// // app.get('/', (req, res) => {        //get requests to the root ("/") will route here
// //     res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
// //                                                         //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
// // });

// // app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
// //     console.log(`Now listening on port ${port}`); 
// // });

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://xmas-day-22-gift-app-default-rtdb.firebaseio.com"
// }
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAYj3WfrUVLegKgVTD-5WplGC2s_9uQrlA",
//   authDomain: "xmas-day-22-gift-app.firebaseapp.com",
//   databaseURL: "https://xmas-day-22-gift-app-default-rtdb.firebaseio.com",
//   projectId: "xmas-day-22-gift-app",
//   storageBucket: "xmas-day-22-gift-app.appspot.com",
//   messagingSenderId: "541724706974",
//   appId: "1:541724706974:web:09faec78b1c08b4b60538f"
// };

// Initialize Firebase
// const app = initializeApp(appSettings);
// const database = getDatabase(app)
// const ListInDB = ref(database, 'list')


// // let people = getPeopleFromLocalStorage() || []

//     let people = []
//     database.ref('list').once('value')
//   .then(snapshot => {
//     if (snapshot.val()) {
//       people = snapshot.val()
//       renderList(people)
//     }
//   })
//   .catch(error => console.error(error))

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const peopleListEl = document.getElementById("people-list")

// addButtonEl.addEventListener("click", function() {
//     let inputValue = inputFieldEl.value
    
//     if (inputValue) {
//         people.push(inputValue)
//         //localStorage
//         // savePeopleToLocalStorage(people);

//         // clearInputFieldEl()
        
//         // renderList(people)

//         // Update Firebase with the new data
//     database.ref('list').set(people)
//     .then(() => {
//       clearInputFieldEl();
//       renderList(people);
//     })
//     .catch(error => console.error(error));

//     }
// })

function renderList(array) {
    clearPeopleListEl()
    
    for (let i = 0; i < array.length; i++) {
        let currentPerson = array[i]
        
        appendPersonToPeopleListEl(currentPerson)
        
    }
}

function clearPeopleListEl() {
    peopleListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

// function appendPersonToPeopleListEl(person) {
    
//     let newEl = document.createElement("li")
    
//     newEl.textContent = person
    
//     newEl.addEventListener("dblclick", function() {
//         let index = people.indexOf(person)

//         people.splice(index, 1)

            // Update Firebase after removing the person
    // database.ref('list').set(people)
    // .then(() => renderList(people))
    // .catch(error => console.error(error));

    //localStorage
        // savePeopleToLocalStorage(people)
            
        // renderList(people)
    // })
    
//     peopleListEl.append(newEl)
// }

// // function savePeopleToLocalStorage(peopleArray) {
// //     localStorage.setItem("people", JSON.stringify(peopleArray))
// // }

// function getPeopleFromLocalStorage() {
//     //localStorage
//     // const storedPeople = localStorage.getItem("people")
//     // return storedPeople ? JSON.parse(storedPeople) : null

//     //firebase
//     return database.ref('list').once('value').then(snapshot => snapshot.val());
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYj3WfrUVLegKgVTD-5WplGC2s_9uQrlA",
  authDomain: "xmas-day-22-gift-app.firebaseapp.com",
  databaseURL: "https://xmas-day-22-gift-app-default-rtdb.firebaseio.com",
  projectId: "xmas-day-22-gift-app",
  storageBucket: "xmas-day-22-gift-app.appspot.com",
  messagingSenderId: "541724706974",
  appId: "1:541724706974:web:09faec78b1c08b4b60538f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const ListInDB = ref(database, 'list');

// let people = [];

get(ListInDB)
  .then((snapshot) => {
    if (snapshot.exists()) {
      people = snapshot.val();
      renderList(people);
    }
  })
  .catch((error) => console.error(error));

// ... (rest of your code)

// ... (previous code)

let people = [];

get(ListInDB)
  .then((snapshot) => {
    if (snapshot.exists()) {
      people = snapshot.val();
      renderList(people);
    }
  })
  .catch((error) => console.error(error));

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  if (inputValue) {
    // Ensure that `people` is an array before using push
    if (!Array.isArray(people)) {
      people = [];
    }

    people.push(inputValue);

    set(ListInDB, people)
      .then(() => {
        clearInputFieldEl();
        renderList(people);
      })
      .catch((error) => console.error(error));
  }
});

// ... (rest of your code)




function appendPersonToPeopleListEl(person) {
  let newEl = document.createElement("li");

  newEl.textContent = person;

  newEl.addEventListener("dblclick", function () {
    let index = people.indexOf(person);

    people.splice(index, 1);

    set(ListInDB, people)
      .then(() => renderList(people))
      .catch((error) => console.error(error));
  });

  peopleListEl.append(newEl);
}
