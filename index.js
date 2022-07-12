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

//Event Listeners
forwardButton.addEventListener('click', forwardPage)
backButton.addEventListener('click', backwardPage)
nonAlcoholic.addEventListener('click', fetchNonAlcoholic)
alcoholCat.addEventListener('click', expandAlchoholCat)

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
    });

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

function expandAlchoholCat() {
    console.log("i was clicked!")
    // const div = document.createElement('div')
    // const brandy = document.createElement('p')
    // const gin = document.createElement('p')
    // const rum = document.createElement('p')
    // const tequila = document.createElement('p')
    // const vodka = document.createElement('p')
    // const whiskey = document.createElement('p')

    // brandy.textContent = "Brandy"
    // gin.textContent = "Gin"
    // rum.textContent = "Rum"
    // tequila.textContent = "Tequila"
    // vodka.textContent = "Vodka"
    // whiskey.textContent = "Whiskey"

    // div.appendChild(brandy)
    // div.appendChild(gin)
    // div.appendChild(rum)
    // div.appendChild(tequila)
    // div.appendChild(vodka)
    // div.appendChild(whiskey)

    // alcoholCat.appendChild(div)
}

//Fetch Functions
function fetchAllDrinks() {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => {
            const result = drinksArr.filter(drink => drink.strAlcoholic == "Non alcoholic" || drink.strAlcoholic == "Optional alcohol")
            console.log(result);
        })
}

function fetchTwentyDrinks(page = 1) {
    fetch(baseURL + `/?_limit=20&_page=${page}`)
        .then(r => r.json())
        .then(drinksArr => renderImages(drinksArr))
}

function fetchNonAlcoholic() {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => {
            const result = drinksArr.filter(drink => drink.strAlcoholic == "Non alcoholic" || drink.strAlcoholic == "Optional alcohol")
            renderImages(result)

        })
}

function appStarter() {
    //fetchAllDrinks()
    fetchTwentyDrinks()
}

appStarter()