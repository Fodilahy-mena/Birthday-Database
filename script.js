// Get the table body from html
const tbody = document.querySelector('tbody');

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Call this destroyPopup function whenever the user wants to skip the popup
async function destroyPopup(popup) {
    popup.classList.remove('open');
    await wait(1000);

    // remove the popup from the DOM
    popup.remove();

    // remove it from the js memory
    popup = null;
}
// async await function for the Promis to go
async function go() {

    const response = await fetch("./people.json");
    // a response variable and await it with fetched variable
    let data = await response.json();
    let persons = data;
    console.log(data);
    


async function displayPeople() {

const sortedPeople = persons.sort(function(a, b) {
    function peopleBirthday(month, day) {

        let now = new Date(),
          yearNow = now.getFullYear(),
          next = new Date(yearNow, month - 1, day);
      
        now.setHours(0, 0, 0, 0);
        if (now > next) next.setFullYear(yearNow + 1);
      
        return Math.round((next - now) / 8.64e7);
    }
    let birthday1 = peopleBirthday(new Date(a.birthday).getMonth()+1,new Date(a.birthday).getDate());
    let birthday2 = peopleBirthday(new Date(b.birthday).getMonth()+1,new Date(b.birthday).getDate());
    
    return birthday1 - birthday2;
});
// Search input
    const searchInput = document.querySelector('.search');
    const selectInput = document.querySelector(".select");
    const resetFilterButton = document.querySelector('.reset-filters');


    // create a displayLyst function to display the data frome the people.json
function displayList(persons) {
    
        // insert the table row as an inner html in the table body
        tbody.innerHTML = persons
        // pass a parameter persons to get the data which has been fetched
        // and map it in order to access all the keys and values from it
        .map((person, index) => { // this index callback is just for css styling in this case

            // function for superscript ordinals
            function nth(day) { // pass a day parameter
                // if the day is less than 3 and more than 21, use "th" as a superscript ordinal
                if(day > 3 && day < 21) return 'th';
                // is the number of the day is not with 10 for example -
                // 11, 12, 13, then don't use "st" "nd" "rd" as superscript ordinals.

                // but with 1, 2, 3, 21, 22, 23, and 31, use them as superscript ordinals
                switch(day % 10) {
                    case 1: return "st";
                    case 2: return "nd";
                    case 3: return "rd";
                    // if the day number is out of those numbers, use "th" as a default 
                    default: return "th";
                }
            }

            // Change the person's birthday timestamp number into a normal date,
            // it may include time zone
            let timestamp_to_date = new Date(person.birthday);

            // take the only date not with time zone or anything by using getDate()
            const date = timestamp_to_date.getDate();

            // create a month array to set all of the month names and compare it to 
            // the the month number according to the date from the person's birthday using getMonth() 
            const month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ][timestamp_to_date.getMonth()];

            // get that date today
            let today = new Date();
            // take the year of today and  subtracts it with the year of when the peron was born -
            // to get how old is the person
            let age = today.getFullYear() - timestamp_to_date.getFullYear() + 1;
            
           
            function peopleBirthday(month, day) {

                let now = new Date(),
                  yearNow = now.getFullYear(),
                  next = new Date(yearNow, month - 1, day);
              
                now.setHours(0, 0, 0, 0);
                
                if (now > next) next.setFullYear(yearNow + 1);
              
                return Math.round((next - now) / 8.64e7);
            }
              
              let birthday = peopleBirthday(timestamp_to_date.getMonth()+1,timestamp_to_date.getDate());
              
            
        return`
        <tr data-id="${person.id}" name="${person.firstName}" id="table_row" class="${index % 2 ? `${birthday === 0 ? "birthday" : "even"}` : `${birthday === 0 ? "birthday" : "odds"}`}" ng-repeat="person in | orderBy:'fromNow' ">
        
            <th scope="row">
                <img class="${index % 2 ? `even_img` : `odd_img`}" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/>
            </th>
            <td>
                <span class="name">${person.firstName} ${person.lastName}</span><br>
                <strong class="turning_age">Turns <span class="age">${age}</span> ${birthday === 0 ? "today" : `on ${month} ${date}<sup>${nth(date)}`}</sup></strong>
            </td>
            <td class="upcoming_birthday">
                <span>${birthday === 0 
                    ? `<span>Happy birthday</span>` 
                    : "In " + `<span class="days">${ birthday}</span>` + ' day' + (birthday > 1 ? 's' : '')}
                </span>
                <div class="buttons">
                    <button class="edit">
                        <img src="./edit.svg" width="35"/>
                    </button>
                    <button class="delete">
                        <img src="./delete.svg" width="35"/>
                    </button>
                </div>
            </td>
		</tr>
        `;
    }).join('');
    }

    // add a birthday
const handleAddBirthday = (e) => {
    // If the user click on add button wherever in the window it finds....
    if (e.target.closest('button.add')) {
        // Go to this addBirthday function and do what it asks to do
        addBirthday();
    }
}
function filterBirthday(e) {
    let searchValue = searchInput.value;
    const lowerCaseValue = searchValue.toLowerCase();
    
    let personsFilterLastName = persons.filter(person => person.lastName.toLowerCase().includes(lowerCaseValue));
    displayList(personsFilterLastName);
}

function filterBirthdayByMonth(e) {
    let selectValue = selectInput.value;
    const numberedValue = Number(selectValue);
    console.log("num",numberedValue)
    
    let personsFilterMonth = persons.filter(person => new Date(person.birthday).getMonth() === numberedValue);
    
    displayList(personsFilterMonth);
}
function filterReset() {
    searchInput.value = '';
    selectInput.value = '';
    displayList(persons);
}
// create an addBirthday function
const addBirthday = () => {
    // take the sortedPeople variable that has been assigned
    // to the persons array object from the person.json

    // create a new variable and assign the sortedPeople to it
    const  birthdayToAdd = sortedPeople;
        console.log(birthdayToAdd);
        return new Promise(async function(resolve) {
        
        console.log('Add button');
        // Create a form element to popup when the condition is completed
        const popupAddList = document.createElement('form');
        // add class "popup"
        popupAddList.classList.add('popup');
        // and class "open"
        popupAddList.classList.add('open');
        // insert the the fieldset to the form element
        popupAddList.insertAdjacentHTML(
            'afterbegin', 
            `<fieldset>
                <label>Enter first name</label>
                <input type="text" value="" name="first">
                <label>Enter last name</label>
                <input type="text" value="" name="last">
                <label>Enter your birthday date</label>
                <input type="date" value="" name="date">
                <label>Avatar image</label>
                <input type="text" value="" name="picUrl">
                <div class="options-btn">
                    <button type="button" class="cancel" name="cancel">Cancel</button>
                    <button type="submit" class="submit_form">Submit</button>
                </div>
            </fieldset>
        `);
            // inside of the form popup that was created, if cancel is true .....
        if(popupAddList.cancel) {
            const cancelButton = popupAddList.cancel;
            console.log("Canceled",cancelButton);
            // demolishe the popup form when click on the name "cancel" button
            cancelButton.addEventListener('click', () => {
                resolve(null);
                destroyPopup(popupAddList);
                
            }, { once: true });
        }

        // listen for a submit button on the popup form
        popupAddList.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("submit form");
            const formEl = e.currentTarget;
            // create a new object
            const newBirthdayList = {
                birthday: formEl.date.value,
                lastName: formEl.last.value,
                firstName: formEl.first.value,
                picture: formEl.picUrl.value,
                id: Date.now(),
            };


            console.log(newBirthdayList);
            // push the new object into the sortedPeople array object
            sortedPeople.push(newBirthdayList);
            // reset the form when that is done
            formEl.reset();
            // use dispacth event for our own event to listen for
            tbody.dispatchEvent(new CustomEvent('updatePeopleList'));
            // whatever is entered, the local storage should save it
            localStorage.setItem('persons', JSON.stringify(sortedPeople));
            // call the displayList fonction so that the new object will appear on the browser -
            // when it is pushed.
            displayList(sortedPeople);
            destroyPopup(popupAddList);
            
        }, { once: true });
        console.log(popupAddList);

        // appendchild the popup form in the body element in index.html
        resolve(document.body.appendChild(popupAddList));
    });

}

const editBirthday = (e) => {
        if (e.target.closest('button.edit')) {
            const tableRow = e.target.closest('tr');
            const id = tableRow.dataset.id;
            editBirthdayPopup(id);
        }
    }

const deleteBirthday = (e) => {
        if (e.target.closest('button.delete')) {
            const tableRow = e.target.closest('tr');
            const id = tableRow.dataset.id;
            deleteBirthdayPopup(id)
        }
    }
    
const editBirthdayPopup = (id) => {
        const  birthdayToEdit = persons.find(person => person.id == id);
        console.log(birthdayToEdit);
        return new Promise(async function(resolve) {
    
            const popupEditeList = document.createElement('form');
            popupEditeList.classList.add('popup');
            popupEditeList.insertAdjacentHTML(
                'afterbegin', 
                `<fieldset>
                    <label>Last name</label>
                    <input type="text" value="${birthdayToEdit.firstName}" name="lastName">
                    <label>First name</label>
                    <input type="text" value="${birthdayToEdit.lastName}" name="firstName">
                    <label>Birthday (datepicker)</label>
                    <input type="date" value="${birthdayToEdit.birthday}" name="birthday">
                    <label>Avatar image</label>
                    <input type="url" value="${birthdayToEdit.picture}" name="avatarUrl">
                    <div class="options-btn">
                        <button type="button" class="cancel" name="cancel">Cancel</button>
                        <button type="submit" class="confirmed">Save</button>
                    </div>
                </fieldset>
            `);
            if(popupEditeList.cancel) {
            	console.log(popupEditeList.cancel);
                const skipButton = popupEditeList.cancel;
                skipButton.addEventListener('click', () => {
            		console.log('cancel');
                    resolve(null);
                    destroyPopup(popupEditeList);
            	}, { once: true });
            }
            popupEditeList.addEventListener('submit', (e) => {
            	e.preventDefault();
                birthdayToEdit.lastName = popupEditeList.lastName.value;
                birthdayToEdit.firstName = popupEditeList.firstName.value;
                birthdayToEdit.birthday = popupEditeList.birthday.value;
                birthdayToEdit.picture = popupEditeList.avatarUrl.value;
            	displayList(sortedPeople);
                resolve(e.currentTarget.remove());
            	destroyPopup(popupEditeList);
                
            }, { once: true });
        resolve(document.body.appendChild(popupEditeList));
        popupEditeList.classList.add('open');
        
    });
    };

    const deleteBirthdayPopup =(id) => {
        const  birthdayToDelete = sortedPeople.find(person => person.id == id);
        return new Promise(async function(resolve) {
            const popupDeleteList = document.createElement('form');
            popupDeleteList.classList.add('popup');
            popupDeleteList.insertAdjacentHTML(
                'afterbegin', 
                `<fieldset>
                    <p>Are you sure you want to delete <strong>${birthdayToDelete.lastName}?</strong></p>
                    <div class="options-btn">
                        <button type="button" class="cancel" name="cancel">Cancel</button>
                        <button type="submit" name="delete" class="confirmed">OK</button>
                    </div>
                </fieldset>
            `);
    
            if(popupDeleteList.cancel) {
                const skipButton = popupDeleteList.cancel;
                console.log(skipButton);
                skipButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popupDeleteList);
                    
                }, { once: true });
    
            }

            popupDeleteList.addEventListener('click', (e) => {
                e.preventDefault();
                if(e.target.closest('button.confirmed')) {
                let deletePersonBirthday = persons.filter(person => person.id != id);
                persons = deletePersonBirthday;
                console.log(deletePersonBirthday);
                sortedPeople.splice();
                localStorage.setItem('persons',JSON.stringify(deletePersonBirthday));
                displayList(deletePersonBirthday);
                destroyPopup(popupDeleteList);
                console.log(sortedPeople);
                }
            }, { once: true });
            
            if(popupDeleteList.delete) {
                const skipButton = popupDeleteList.delete;
                skipButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popupDeleteList);
                }, { once: true });
            }
            resolve(document.body.appendChild(popupDeleteList));
	
	        popupDeleteList.classList.add('open');
        });  
    }

    window.addEventListener('click', handleAddBirthday);
    displayList(persons);
    window.addEventListener('click', editBirthday);
    window.addEventListener('click', deleteBirthday);
    searchInput.addEventListener('input', filterBirthday);
    selectInput.addEventListener('input', filterBirthdayByMonth);
    resetFilterButton.addEventListener('click', filterReset)
}


// save to local storage
function initLocalStorage() {
    const saveBirtdayList = JSON.parse(localStorage.getItem('persons'));
    if(saveBirtdayList) {
        persons = saveBirtdayList;
        displayPeople(persons);
    }
    tbody.dispatchEvent(new CustomEvent('updatePeopleList'));
}
//update the local storage when there is any change
function updateToLocalStorage() {
    localStorage.setItem('persons', JSON.stringify(persons));
}

tbody.addEventListener('updatePeopleList', updateToLocalStorage);
initLocalStorage();

};

go();

