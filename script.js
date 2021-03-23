
// Get the section element by class cards from html

const cards = document.querySelector('.cards');

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

// avoid background scrolling when a modal appears
function hideScrollBar() {
    const body = document.body;
        body.style.height = '100vh';
        body.style.overflowY = 'hidden';
}

function resetScrollBar() {
    const body = document.body;
    body.style.height = 'unset';
    body.style.overflowY = 'unset';
}

// async await function for the Promis to go
async function go() {

    const response = await fetch("./people.json");
    // a response variable and await it with fetched variable
    let data = await response.json();
    let persons = data;
    
async function displayPeople() {

const sortedPeople = persons.sort((a, b) => {
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
    
        // insert the table row as an inner html in the section
        cards.innerHTML = persons
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

            // take the year of today and  subtracts it with the year of when the peron was born -
            // to get how old is the person

            // to get how old is the person
            // let age = today.getFullYear() - timestamp_to_date.getFullYear();
            let birthday = peopleBirthday(timestamp_to_date.getMonth()+1,timestamp_to_date.getDate());
            
            const ageInYears = birthday === 0 ? Math.floor((Date.now() - timestamp_to_date) / 365 / 24 / 60 / 60 / 1000) : Math.ceil((Date.now() - timestamp_to_date) / 365 / 24 / 60 / 60 / 1000);
            function peopleBirthday(month, day) {

                let now = new Date(),
                  yearNow = now.getFullYear(),
                  next = new Date(yearNow, month - 1, day);
              
                now.setHours(0, 0, 0, 0);
                
                if (now > next) next.setFullYear(yearNow + 1);
              
                return Math.round((next - now) / 8.64e7);
            }
              
            
        return`
        <div data-id="${person.id}" name="${person.firstName}" class="card_item ${index % 2 ? `${birthday === 0 ? "birthday" : "even"}` : `${birthday === 0 ? "birthday" : "odds"}`}" ng-repeat="person in | orderBy:'fromNow' ">
        
            <figure class="item_fig">
                <img class="${index % 2 ? `even_img` : `odd_img`}" src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/>
            </figure>
            <div class="item_row">
                <span class="name">${person.firstName} ${person.lastName}</span><br>
                <strong class="turning_age">Turns <span class="age">${ageInYears} year${ageInYears > 1 ? 's' : ''} old</span> ${birthday === 0 ? "today" : `on ${month} ${date}<sup>${nth(date)}`}</sup></strong>
            </div>
            <div class="item_row upcoming_birthday">
                <span>${birthday === 0 
                    ? `<span>Happy birthday</span>` 
                    : "In " + `<span class="days">${ birthday}</span>` + ' day' + (birthday > 1 ? 's' : '')}
                </span>
                <div class="buttons">
                    <button class="edit">
                        <img class="svg_icon" src="./images/edit.svg"/>
                    </button>
                    <button class="delete">
                        <img class="svg_icon" src="./images/delete.svg"/>
                    </button>
                </div>
            </div>
		</div>
        `;
    }).join('');
    }

    // add a birthday
const handleAddBirthday = (e) => {
    // If the user click on add button wherever in the window it finds....
    if (e.target.closest('button.add')) {
        // Go to this addBirthday function and do what it asks to do
        addBirthday();
        // avoid scrolling
        hideScrollBar();
    }
}
function filterByNameAndMonth() {
    const filteredByMonth = filterBirthdayByMonth(persons);
    const filteredByNameAndMonth = filterBirthdayByName(filteredByMonth);
    displayList(filteredByNameAndMonth);
}

function filterBirthdayByName(personsData) {
    // get the value of the search input
    let searchValue = searchInput.value;
    const lowerCaseValue = searchValue.toLowerCase();
    // filter by either firstName or lastName and birthday month
    return personsData.filter(person => person.lastName.toLowerCase().includes(lowerCaseValue) || person.firstName.toLowerCase().includes(lowerCaseValue));
}

function filterBirthdayByMonth(personsData) {
    let selectValue = selectInput.value;
    const numberedValue = Number(selectValue);
    return personsData.filter(person => new Date(person.birthday).getMonth() === numberedValue);
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

        return new Promise(async function(resolve) {
        // maximum date, avoid user selecting on future date
        const maximumDate = new Date().toISOString().slice(0,10);

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
                <div>
                    <img class="svg_icon close" name="close" src="./images/close.svg" alt="close popup"/>
                    <h2>Add a new person</h2>
                    <label>Enter first name</label>
                    <input type="text" value="" name="first">
                    <label>Enter last name</label>
                    <input type="text" value="" name="last">
                    <label>Enter your birthday date</label>
                    <input type="date" value="" name="date" max = ${maximumDate}>
                    <label>Avatar image</label>
                    <input type="text" value="" name="picUrl">
                    <div class="options-btn">
                        <button type="button" class="cancel" name="cancel">Cancel</button>
                        <button type="submit" class="submit_form">Submit</button>
                    </div>
                </div>
            </fieldset>
        `);
            // inside of the form popup that was created, if cancel is true .....
        if(popupAddList.cancel) {
            const cancelButton = popupAddList.cancel;
            // demolishe the popup form when click on the name "cancel" button
            cancelButton.addEventListener('click', () => {
                resolve(null);
                destroyPopup(popupAddList);
                // show scroll bar
                resetScrollBar();
            }, { once: true });
        }

        if(popupAddList.close) {
            const closeButton = popupAddList.close;
            // demolishe the popup form when click on the name "cancel" button
            closeButton.addEventListener('click', () => {
                resolve(null);
                destroyPopup(popupAddList);
                // show scroll bar
                resetScrollBar();
            }, { once: true });
        }

        // const dateInput = document.querySelector('input[type=date]').max = new Date().toISOString().slice(0,10);
        //     console.log(dateInput);

        // listen for a submit button on the popup form
        popupAddList.addEventListener('submit', (e) => {
            e.preventDefault();
            const formEl = e.currentTarget;
            
            // create a new object
            const newBirthdayList = {
                birthday: formEl.date.value,
                lastName: formEl.last.value,
                firstName: formEl.first.value,
                picture: formEl.picUrl.value,
                id: Date.now(),
            };
            // push the new object into the sortedPeople array object
            sortedPeople.push(newBirthdayList);
            // reset the form when that is done
            formEl.reset();
            // use dispacth event for our own event to listen for
            triggerLocalStoragerUpdate();
            // whatever is entered, the local storage should save it
            updateLocalPerson(sortedPeople);
            // call the displayList fonction so that the new object will appear on the browser -
            // when it is pushed.
            displayList(sortedPeople);
            destroyPopup(popupAddList);
            resetScrollBar();
            
        }, { once: true });
        
        // appendchild the popup form in the body element in index.html
        resolve(document.body.appendChild(popupAddList));
    });

}

const editBirthday = (e) => {
        if (e.target.closest('button.edit')) {
            const tableRow = e.target.closest('.card_item');
            const id = tableRow.dataset.id;
            editBirthdayPopup(id);
            // avoid scrolling
            hideScrollBar();
        }
    }

const deleteBirthday = (e) => {
        if (e.target.closest('button.delete')) {
            const tableRow = e.target.closest('.card_item');
            const id = tableRow.dataset.id;
            deleteBirthdayPopup(id);
            // avoid scrolling
            hideScrollBar();
        }
    }
    
const editBirthdayPopup = (id) => {
        const  birthdayToEdit = persons.find(person => person.id == id);
        
        const birthdayDate = new Date(birthdayToEdit.birthday).toISOString().split('T')[0];
        
        // maximum date, avoid user selecting on future date
        const maximumDate = new Date().toISOString().slice(0,10);

        return new Promise(async function(resolve) {
            
            const popupEditeList = document.createElement('form');
            popupEditeList.classList.add('popup');
            popupEditeList.insertAdjacentHTML(
                'afterbegin', 
                `<fieldset>
                    <div>
                        <img class="svg_icon close" name="close" src="./images/close.svg" alt="close popup"/>
                        <h2>Edit ${birthdayToEdit.firstName} ${birthdayToEdit.lastName}</h2>
                        <label>Last name</label>
                        <input type="text" value="${birthdayToEdit.firstName}" name="lastName">
                        <label>First name</label>
                        <input type="text" value="${birthdayToEdit.lastName}" name="firstName">
                        <label>Birthday</label>
                        <input type="date" value="${birthdayDate}" max=${maximumDate} name="birthday">
                        <label>Avatar image</label>
                        <input type="url" value="${birthdayToEdit.picture}" name="avatarUrl">
                        <div class="options-btn">
                            <button type="button" class="cancel" name="cancel">Cancel</button>
                            <button type="submit" class="confirmed">Save</button>
                        </div>
                    </div>
                </fieldset>
            `);
            if(popupEditeList.cancel) {
                const skipButton = popupEditeList.cancel;
                skipButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popupEditeList);
                    // show scroll bar
                    resetScrollBar();
            	}, { once: true });
            }

            if(popupEditeList.close) {
                const closeButton = popupEditeList.close;
                closeButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popupEditeList);
                    resetScrollBar();
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
                triggerLocalStoragerUpdate();
                // show scroll bar
                resetScrollBar();
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
                    <div>
                        <img class="svg_icon close" name="close" src="./images/close.svg" alt="close popup"/>
                        <p>Are you sure you want to delete <strong>${birthdayToDelete.lastName}?</strong></p>
                        <div class="options-btn">
                            <button type="button" class="cancel" name="cancel">Cancel</button>
                            <button type="submit" name="delete" class="confirmed">OK</button>
                        </div>
                    </div>
                </fieldset>
            `);
    
            if(popupDeleteList.cancel) {
                const skipButton = popupDeleteList.cancel;
                skipButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popupDeleteList);
                    hideScrollBar();
                }, { once: true });
    
            }

            if(popupDeleteList.close) {
                const closeButton = popupDeleteList.close;
                closeButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popupDeleteList);
                    resetScrollBar();
                }, { once: true });
    
            }
            popupDeleteList.addEventListener('click', (e) => {
                e.preventDefault();
                if(e.target.closest('button.confirmed')) {
                let deletePersonBirthday = persons.filter(person => person.id != id);
                persons = deletePersonBirthday;
                sortedPeople.splice();
                updateLocalPerson(deletePersonBirthday);
                displayList(deletePersonBirthday);
                destroyPopup(popupDeleteList);
                }
                resetScrollBar();
            }, { once: true });
            
            if(popupDeleteList.delete) {
                const skipButton = popupDeleteList.delete;
                skipButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popupDeleteList);
                    resetScrollBar();
                }, { once: true });
            }
            resolve(document.body.appendChild(popupDeleteList));
	
	        popupDeleteList.classList.add('open');
        });  
    }

    window.addEventListener('click', handleAddBirthday);
    displayList(sortedPeople);
    window.addEventListener('click', editBirthday);
    window.addEventListener('click', deleteBirthday);
    searchInput.addEventListener('input', filterByNameAndMonth);
    selectInput.addEventListener('input', filterByNameAndMonth);
    resetFilterButton.addEventListener('click', filterReset)
}


// save to local storage
function initLocalStorage() {
    const saveBirtdayList = JSON.parse(localStorage.getItem('persons'))
    if(saveBirtdayList) {
        persons = saveBirtdayList;
        displayPeople(persons);
    } else {
        // display the original persons data if there is nothing in localeStorage
        displayPeople(persons);
    }
    triggerLocalStoragerUpdate();
}

function triggerLocalStoragerUpdate() {
    cards.dispatchEvent(new CustomEvent('updatePeopleList'));
}
function updateLocalPerson(newPersons) {
    localStorage.setItem('persons',JSON.stringify(newPersons));
}
// update the local storage when there is any change
function updateToLocalStorage() {
    updateLocalPerson(persons);
}

cards.addEventListener('updatePeopleList', updateToLocalStorage);
initLocalStorage();

};

go();

