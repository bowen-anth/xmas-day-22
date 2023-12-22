import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAYj3WfrUVLegKgVTD-5WplGC2s_9uQrlA",
  authDomain: "xmas-day-22-gift-app.firebaseapp.com",
  databaseURL: "https://xmas-day-22-gift-app-default-rtdb.firebaseio.com",
  projectId: "xmas-day-22-gift-app",
  storageBucket: "xmas-day-22-gift-app.appspot.com",
  messagingSenderId: "541724706974",
  appId: "1:541724706974:web:09faec78b1c08b4b60538f"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();


// let people = getPeopleFromLocalStorage() || []

    let people = []
    database.ref('list').once('value')
  .then(snapshot => {
    if (snapshot.val()) {
      people = snapshot.val()
      renderList(people)
    }
  })
  .catch(error => console.error(error))

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const peopleListEl = document.getElementById("people-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    if (inputValue) {
        people.push(inputValue)
        //localStorage
        // savePeopleToLocalStorage(people);

        // clearInputFieldEl()
        
        // renderList(people)

        // Update Firebase with the new data
    database.ref('list').set(people)
    .then(() => {
      clearInputFieldEl();
      renderList(people);
    })
    .catch(error => console.error(error));

    }
})

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

function appendPersonToPeopleListEl(person) {
    
    let newEl = document.createElement("li")
    
    newEl.textContent = person
    
    newEl.addEventListener("dblclick", function() {
        let index = people.indexOf(person)

        people.splice(index, 1)

            // Update Firebase after removing the person
    database.ref('list').set(people)
    .then(() => renderList(people))
    .catch(error => console.error(error));

    //localStorage
        // savePeopleToLocalStorage(people)
            
        // renderList(people)
    })
    
    peopleListEl.append(newEl)
}

// function savePeopleToLocalStorage(peopleArray) {
//     localStorage.setItem("people", JSON.stringify(peopleArray))
// }

function getPeopleFromLocalStorage() {
    //localStorage
    // const storedPeople = localStorage.getItem("people")
    // return storedPeople ? JSON.parse(storedPeople) : null

    //firebase
    return database.ref('list').once('value').then(snapshot => snapshot.val());
}