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
let cocktailImageContainer = document.querySelector("#cocktail-image-container")

//Render Image Functions
function renderImages(drinksArr) {
    drinksArr.forEach(drink => {
        let cocktailThumbnail = document.createElement('img')
        cocktailThumbnail.src = drink.strDrinkThumb
        console.log(cocktailThumbnail)
        cocktailImageContainer.appendChild(cocktailThumbnail)
    });

}

//Fetch Functions
function fetchAllDrinks() {
    fetch(baseURL)
        .then(r => r.json())
        .then(drinksArr => {
            drinksArr.forEach(drink => console.log(drink));
        })
}

function fetchTwentyDrinks() {
    fetch(baseURL + `/?_limit=20&_page=${page}`)
        .then(r => r.json())
        .then(drinksArr => renderImages(drinksArr))
}

function appStarter() {
    //fetchDrinks()
    fetchTwentyDrinks()
}

appStarter()