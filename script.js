
const tbody = document.querySelector('tbody');
// async await function for the Promis to go

async function go() {
    const response = await fetch("./people.json");
    // a response variable and await it with fetched variable

    const data = await response.json();
    const people = data;
    console.log(data);
    const sortedPeople = people.sort(function(a, b) {return b.birthday - a.birthday;});
    
    const html = sortedPeople.map(person => {
        return`
        <tr data-id="${person.id}">
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
    tbody.innerHTML = html;
};

go();

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

const editBirthday = (e) => {
    if (e.target.closest('button.edit')) {
		const tableRow = e.target.closest('tr');
		const id = tableRow.dataset.id;
		editBirthdayPopup(id);
	}
}

const editBirthdayPopup = (id) => {
	const birthdayToEdit = sortedPeople.find(person => person.id === id);
	return new Promise(async function(resolve) {

		const popupEditeList = document.createElement('form');
		popupEditeList.classList.add('popup');
		popupEditeList.insertAdjacentHTML(
			'afterbegin', 
			`<fieldset>
				<label>Last name</label>
				<input type="text" value="${birthdayToEdit.lastName}" name="lastName">
				<label>First name</label>
				<input type="text" value="${birthdayToEdit.firstName}" name="firstName">
				<label>Birthday (datepicker)</label>
				<input type="text" value="${new Date(birthdayToEdit.birthday)}" name="birthday">
				<label>Avatar image</label>
				<input type="url" value="${birthdayToEdit.picture}" name="avatarUrl">
				<button type="button" class="cancel" name="cancel">Cancel</button>
				<button type="submit" class="confirmed">Save</button>
			</fieldset>
		`);
		// if(popupEditeList.cancel) {
		// 	console.log(popupEditeList.cancel);
        //     const skipButton = popupEditeList.cancel;
        //     skipButton.addEventListener('click', () => {
		// 		console.log('cancel');
        //         resolve(null);
        //         destroyPopup(popupEditeList);
		// 	}, { once: true });
	

        // }
		// popupEditeList.addEventListener('submit', (e) => {
		// 	e.preventDefault();
        //     birthdayToEdit.lastName = popupEditeList.lastName.value;
        //     birthdayToEdit.firstName = popupEditeList.firstName.value;
        //     birthdayToEdit.birthday = popupEditeList.birthday.value;
        //     birthdayToEdit.picture = popupEditeList.picture.value;
		// 	displayList(people);
        //     resolve(e.currentTarget.remove());
		// 	destroyPopup(popupEditeList);
			
		// }, { once: true }
		
		// );
		
		
	resolve(document.body.appendChild(popupEditeList));
	popupEditeList.classList.add('open');
	
});
};


window.addEventListener('click', editBirthday);