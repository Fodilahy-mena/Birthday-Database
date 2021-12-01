# Birthday Database

Vanilla JS project that renders a birthday list.

The app sorts the list according to the people's closest birthday.

There is a file in the project called person.json which contains a list of people.

The first time the app is launched, it fetches all the data from the people.json local file.

Once the data is loaded in the app, it is saved on localstorage.

## Demo of the result

![images/screenshot.png](images/screenshot.png)

The users are able to add a new element on the list (only on the app list localstorage, not on the json). 
The Required input fields for a new element are:

-   first name
-   last name
-   birthday
-   an url for their avatar image
-   an id for handling the operations on the objects.

The users are able to edit an element on the list. When user clicks the edit button, a modal appears with a form inside, to edit any attribute.

The users can delete an element. There will be a modal that will ask if user is sure to delete the element.

Every action is persisted into the local storage.

A package for handling date computations. Added as a dependency of this project.

[https://date-fns.org/v1.29.0/docs/differenceInYears](https://date-fns.org/v1.29.0/docs/differenceInYears)

## Used tech stack

- [HTML5](http://html5doctor.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Vanilla Javascript](http://vanilla-js.com/)
