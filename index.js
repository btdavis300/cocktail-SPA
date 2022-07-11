//Global Variables
const baseURL = ("http://localhost:3000/drinks")

//Fetch Functions
function fetchDrinks() {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => drinksArr.forEach(drink => console.log(drink.strIngredient15)))
}

function appStarter() {
    fetchDrinks()
}

appStarter()