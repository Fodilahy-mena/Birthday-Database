# Term 3 JS Project : Birthday App

Hey team! So the final project here will be a birthday list.

We have a list of persons. The app will show us whose person is the closest to have their birthday.

You have a file in the project called person.json. It contains a list of persons, and we want to add all those persons to our birthday list app.

The first time you launch the app, it should fetch all the data from the people.json local file. You can use fetch for that, it also works with local files.

Once they are loaded in the app, you can save them on localstorage, and you don't need to work with the json file anymore.

The app will show the list of people, sorted by the ones who will have their birthday the soonest.

![assets/Screenshot_2020-09-12_at_16.57.18.png](assets/Screenshot_2020-09-12_at_16.57.18.png)

The screenshot is just an example of a possible layout. Feel free to create a custom layout with boostrap if you want to.

The users will be able to add a new element on the list (only on the app list localstorage, not on the json). Here are the fields :

-   first name
-   last name
-   birthday (datepicker)
-   an url for their avatar image
-   an id for handling the operations on the objects. (no need to add that on the form)

The users should be able to edit an element on the list. When you click the edit button, a modal should appear with a form inside, to edit any attribute.

The users should be able to delete an element. There will be a modal that will ask if you're sure to delete the element.

Every action should be persisted into the local storage.

Here is the package you should use for handling date computations. Add it as a dependency of your project

[https://date-fns.org/v1.29.0/docs/differenceInYears](https://date-fns.org/v1.29.0/docs/differenceInYears)

Again, try to make a plan, by dividing big tasks into smaller ones.
You have the whole week to work on it. You can collaborate with other students, but copy/pasting code is forbidden.
Once you're finished with the functionality, try to make your app more appealing with css and other tricks.
Be creative 🎨

Good Luck

## Report

### Structure

- An async function from line 9 to line 18 is a destroy popup fuction which is called when users want to skip form popup.
- go() async function is set in order to fetche all data from `people.json` using await. This function also wraps all functions that will be datailed below. Some of functions that are in it have nested functions. Basically, it is devided into three parts. The first function which is `displayPeople()` function has something to do with *displaying the data from fetched `people.json`*, *adding people to the data*, *deleting people from the data and ediditing*. The second and the third functions have something to do with initializing and updating the data to the localstorage.

First of all I will be going a little bit more about the `displayPeople()` function which has the most of the main idea about this project.

1. Ok..., umm - inside the `handleAddBirthday()` function, I utilized a `e.target.closest()` methode to check if a user click on a button that has an `add` class and if that is true, apply this `addBirthday()`. Then listen for a click event on the window to handle this `handleAddBirthday()` function in line 335. 
    1. In the `addBirthday()` function, there is a form inputs that require some values from the user and push taht values to the fetched `people.json` if the user submit the form. Otherwise it dosen't do anything when user click on cancel button but destroying the form - form that behaves like a prompt.
2. This `displayList` function from line 131 to 212 is displaying the data from fetched `people.json` to html file. A map() methode is used here to access each component of each person to a list. But in my case I used table rows instead of list items - just a matter of html and css prefference. 
    1. Since date.fns is not really accessible for me, I used js new Date() trick to get the how old the person is and how many days left before their upcoming birthday. It does a little bit with it but it is right.

3. The `editBirthdayPopup()` is a edit popup form for the user to be able to convert their info from the birthday app. For example, changing their birthday date, First name, Last name, Avatar picture because sometimes there could be any misspelling or wrong date when entering them. Then the user can click on save button to submit their changes to the list if they are happy with it.

4. An other function is `deleteBirthdayPopup()` which basically a popup form for confirmation - making sure that the user really decides to delete a person from the list after clicking on delete button.  

### Improvements

- We had quite a plenty of time to accomplish the project but it is only challenging. I would have gone a little bit forward with the sorting part if I could but I was running out of idea on how to sort the list by days left before each items's upcoming birthday. I also want to go further about editing. The changes that I made can't be saved in the local storage - meaning, it goes back as it was after refreshing the page.

### Experience

- What I learned was that I can not access anything from displayed html - deleting, editing them unless I pass the function that holds it to the function where to delete and edite things.

### Challenges

The most challenging part was to get each items's turning age, calculating the number of days left before upcoming birthday and sort the list according to that. 


