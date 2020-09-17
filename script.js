
const tbody = document.querySelector('tbody');
const tr = document.querySelector('tr');

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
    async function fetchPeople() {
    const response = await fetch("./people.json");
    // a response variable and await it with fetched variable
    const data = await response.json();
    return data;
    // console.log(people);
    }

    

    async function displayPeople() {
        const displayFetch = await fetchPeople();
    let sortedPeople = displayFetch.sort(function(a, b) {return b.birthday - a.birthday;});

    console.log("Sorted",sortedPeople);

    // save to local storage

    // update the local storage when there is any change
    function updateToLocalStorage() {
        // const save = people;
        localStorage.setItem('data', JSON.stringify(data));
    }

    function saveToLocalStorage() {
        const saveBirtdayList = JSON.parse(localStorage.getItem('data'));
        if(saveBirtdayList) {
            data = saveBirtdayList;
            displayList(data);
        }
        tr.dispatchEvent(new CustomEvent('updatePeopleList'));
    }
    


        // add a birthday
const handleAddBirthday = (e) => {
    if (e.target.closest('button.add')) {
        addBirthday();
    }
}
const addBirthday = () => {
    const  birthdayToAdd = sortedPeople;
        console.log(birthdayToAdd);
        return new Promise(async function(resolve) {
        
        console.log('Add button');
        const popupAddList = document.createElement('form');
        popupAddList.classList.add('popup');
        popupAddList.classList.add('open');
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

        if(popupAddList.cancel) {
            const cancelButton = popupAddList.cancel;
            console.log("Canceled",cancelButton);
            cancelButton.addEventListener('click', () => {
                resolve(null);
                destroyPopup(popupAddList);
                
            }, { once: true });
        }

        popupAddList.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("submit form");
            const formEl = e.currentTarget;
            const newBirthdayList = {
                birthday: formEl.date.value,
                lastName: formEl.last.value,
                firstName: formEl.first.value,
                picture: formEl.picUrl.value,
                id: Date.now(),
            };
            
            console.log(newBirthdayList);
            displayFetch.push(newBirthdayList);
            tr.dispatchEvent(new CustomEvent('updatePeopleList'));
            formEl.reset();
            displayList(sortedPeople);
            destroyPopup(popupAddList);
            
        }, { once: true });
        console.log(popupAddList);
        resolve(document.body.appendChild(popupAddList));
    });

}

    
    const displayList = data => {
        console.log("data is an", data);
        tbody.innerHTML = data
        .map((person, index) => {
            function nth(day) {
                if(day > 3 && day < 21) return 'th';
                switch(day % 10) {
                    case 1: return "st";
                    case 2: return "nd";
                    case 3: return "rd";
                    default: return "th";
                }
            }
            let timestamp_to_date = new Date(person.birthday);
            const date = timestamp_to_date.getDate();

            const month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ][timestamp_to_date.getMonth()];
            let today = new Date();
            let age = today.getFullYear() - timestamp_to_date.getFullYear();
        return`
        <tr data-id="${person.id}"  class="${index % 2 ? 'even' : 'odds'}">
            <th scope="row">
                <img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/>
            </th>
            <td>
                <span>${person.firstName} ${person.lastName}</span><br>
                <strong>Turns ${age} on ${month} ${date}<sup>${nth(date)}</sup></strong>
            </td>
            <td>Days</td>
            <td>
                <button class="edit">
                    <img src="./edit.png" width="35"/>
                </button>
            </td>
            <td>
                <button class="delete">
                    <img src="./delete.png" width="35"/>
                </button>
            </td>
		</tr>
        `;
    }).join('');
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
        const  birthdayToEdit = sortedPeople.find(person => person.id == id);
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
                let deletePersonBirthday = sortedPeople.filter(person => person.id != id);
                sortedPeople = deletePersonBirthday;
                console.log(deletePersonBirthday);
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
    displayList(sortedPeople);
    tr.addEventListener('updatePeopleList', saveToLocalStorage);
    window.addEventListener('click', editBirthday);
    window.addEventListener('click', deleteBirthday);
    updateToLocalStorage();
}
displayPeople();

};

go();

