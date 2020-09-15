
const tbody = document.querySelector('tbody');
// async await function for the Promis to go

async function go() {
    const response = await fetch("./people.json");
    // a response variable and await it with fetched variable

    const people = await response.json();
    console.log(people);
    let sortedPeople = people.sort(function(a, b) {return b.birthday - a.birthday;});
    
    const displayList = data => {tbody.innerHTML = data.map((person, index) => {
        return`
        <tr data-id="${person.id}"  class="${index % 2 ? 'even' : 'odds'}">
            <th scope="row">
                <img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/>
            </th>
            <td>
                <span>${person.firstName} ${person.lastName}</span><br>
                <strong>${new Date(person.birthday)}</strong>
            </td>
            <td>${new Date(person.birthday)}</td>
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
    // tbody.innerHTML = html;

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
    
    function wait(ms = 0) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function destroyPopup(popup) {
        popup.classList.remove('open');
        await wait(1000);
    
        // remove the popup from the DOM
        popup.remove();
    
        // remove it from the js memory
        popup = null;
    }
    
    const editBirthdayPopup = (id) => {
        // const birthdayToEdit = sortedPeople.find(person => person.id === idToEdit);
        const  birthdayToEdit = sortedPeople.find(person => person.id === id);
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
                    <input type="text" value="${new Date(birthdayToEdit.birthday)}" name="birthday">
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
                
            }, { once: true }
            
            );
            
            
        resolve(document.body.appendChild(popupEditeList));
        popupEditeList.classList.add('open');
        
    });
    };

    const deleteBirthdayPopup =(id) => {
        const  birthdayToDelete = sortedPeople.find(person => person.id === id);
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
                let deletePersonBirthday = sortedPeople.filter(person => person.id !== id);
                sortedPeople = deletePersonBirthday;
                displayList(deletePersonBirthday);
                destroyPopup(popupDeleteList);
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


    displayList(sortedPeople);
    window.addEventListener('click', editBirthday);
    window.addEventListener('click', deleteBirthday);
};

go();

