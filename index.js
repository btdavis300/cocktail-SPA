//HTML code for new submit form
//  <div>
//         <form id="new-cocktail-form">
//             <input type="text" name="cocktail-name-input" id="cocktail-name-input" placeholder="New Cocktail Name">

//             <input type="text" name="cocktail-image-input" id="cocktail-image-input"
//                 placeholder="New Cocktail Image Url">

//             <input type="text" name="cocktail-ingredients-input" id="cocktail-ingredients-input"
//                 placeholder="New Cocktail ingredients">

//             <input type="text" name="cocktail-instructions-input" id="cocktail-instructions-input"
//                 placeholder="New Cocktail instructions">

//             <label for="alcohol-base">Alcohol Base:</label>
//             <select id="alcohol-base" name="alcohol-base">
//                 <option value="brandy">Brandy</option>
//                 <option value="gin">Gin</option>
//                 <option value="rum">Rum</option>
//                 <option value="tequila">Tequila</option>
//                 <option value="vodka">Vodka</option>
//                 <option value="whiskey">Whiskey</option>

//                 <input type="submit" value="Create Cocktail">
//         </form>
//     </div>

//Global Variables
const baseURL = ("http://localhost:3000/drinks")
let page = 1
let forwardButton = document.getElementById("forward")
let backButton = document.getElementById('backward')
let nonAlcoholic = document.getElementById('nonAlcoholic')
let alcoholCat = document.getElementById('alcoholCat')
let alcoholList = document.getElementById('alcoholList')
let drinkTypes = document.getElementById('drinkTypes')
let drinkList = document.getElementById('drinkList')
let cocktailName = document.getElementById('cocktail-name')
let cocktailImage = document.getElementById('cocktail-image')
let cocktailInstructions = document.getElementById('instructions')
let browse = document.getElementById('browse')
let searchBar = document.getElementById('search-bar')
let searchForm = document.getElementById('search-bar-form')

//Event Listeners
forwardButton.addEventListener('click', forwardPage)
backButton.addEventListener('click', backwardPage)
nonAlcoholic.addEventListener('click', fetchNonAlcoholic)
browse.addEventListener('click', fetchTwentyDrinks)

//Search Functions
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let searchInput = searchBar.value.toUpperCase()
    fetchSearch(searchInput)

})

//Navigational Bar Functions
alcoholCat.onmouseover = function () {
    alcoholList.style.display = "flex"
}
alcoholCat.onmouseout = function () {
    alcoholList.style.display = "none"
}

drinkTypes.onmouseover = function () {
    drinkList.style.display = "flex"
}
drinkTypes.onmouseout = function () {
    drinkList.style.display = "none"
}

function grabCategory(e) {
    const alcohol = e.target.textContent
    filterCategory(alcohol)
    alcoholList.style.display = "none"
}

function grabType(e) {
    const alcohol = e.target.textContent
    filterType(alcohol)
    drinkList.style.display = "none"
}

//Render Image Functions
function renderImages(drinksArr) {
    const cocktailImageContainer = document.querySelector("#cocktail-image-container")
    if (cocktailImageContainer.children.length > 0) {
        const cocktailClass = document.querySelectorAll(".imageItem")
        cocktailClass.forEach(drink => {
            drink.remove()
        })
    }

    drinksArr.forEach(drink => {
        const cocktailThumbnail = document.createElement('img')
        cocktailThumbnail.src = drink.strDrinkThumb
        cocktailThumbnail.classList.add("imageItem")
        cocktailImageContainer.appendChild(cocktailThumbnail)
        cocktailThumbnail.addEventListener('click', () => {
            displayCocktail(drink)
        })
    });

}

function displayCocktail(drink) {
    cocktailName.textContent = drink.strDrink
    cocktailImage.src = drink.strDrinkThumb
    cocktailInstructions.textContent = drink.strInstructions

    const ing1 = document.getElementById('ing1')
    const ing2 = document.getElementById('ing2')
    const ing3 = document.getElementById('ing3')
    const ing4 = document.getElementById('ing4')
    const ing5 = document.getElementById('ing5')
    const ing6 = document.getElementById('ing6')
    const ing7 = document.getElementById('ing7')

    ing1.textContent = drink.strIngredient1
    ing2.textContent = drink.strIngredient2
    ing3.textContent = drink.strIngredient3
    ing4.textContent = drink.strIngredient4
    ing5.textContent = drink.strIngredient5
    ing6.textContent = drink.strIngredient6
    ing7.textContent = drink.strIngredient7
}

//Button Functions
function forwardPage() {
    if (page < 10) {
        page += 1
        fetchTwentyDrinks(page)
    }
}

function backwardPage() {
    if (page > 1) {
        page -= 1
        fetchTwentyDrinks(page)
    } else if (page = 1) {
        alert("You've gone too far. TURN BACK!")
    }
}


//Fetch Functions
function fetchTwentyDrinks(page = 1) {
    fetch(baseURL + `/?_limit=20&_page=${page}`)
        .then(r => r.json())
        .then(drinksArr => {
            renderImages(drinksArr)
            displayCocktail(drinksArr[0])
        })
}

function fetchNonAlcoholic() {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => {
            const result = drinksArr.filter(drink => drink.strAlcoholic == "Non alcoholic" || drink.strAlcoholic == "Optional alcohol")
            renderImages(result)
        })
}

function fetchSearch(searchInput) {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => {
            const result = drinksArr.find(drink => drink.strDrink.toUpperCase() == searchInput)
            displayCocktail(result)
        })
}

function filterCategory(alcohol) {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => {
            const result = drinksArr.filter(drink => drink.alcCategory == alcohol)
            renderImages(result)
            displayCocktail(result[0])
        })
}

function filterType(alcohol) {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => {
            const result = drinksArr.filter(drink => drink.strCategory == alcohol)
            renderImages(result)
            displayCocktail(result[0])
        })
}

function filterMisc() {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => {
            const result = drinksArr.filter(drink =>
                drink.strCategory == "Punch / Party Drink" ||
                drink.strCategory == "Other/Unknown" ||
                drink.strCategory == "Beer" ||
                drink.strCategory == "Homemade Liqueur" ||
                drink.strCategory == "Shake")
            renderImages(result)
            displayCocktail(result[0])
            drinkList.style.display = "none"
        })
}

function appStarter() {
    fetchTwentyDrinks()
}

appStarter()