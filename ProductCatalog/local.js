//getting and setting item
//local storage can only save string.

localStorage.setItem('firstname','Wasee');
localStorage.setItem('lastname', 'Sarwar');
console.log(localStorage.getItem('firstname'));


const person = {
    fisrtname : 'Wasee',
    lastname  : 'sarwar',
}

localStorage.setItem('person', JSON.stringify(person));
console.log(JSON.parse(localStorage.getItem('person',person)));

//delete item
localStorage.clear();
