//variables
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const searchResults =document.querySelector('#search-results');
const searchRandom = document.querySelector('#search-random');

searchInput.addEventListener('input',generateResults);
searchButton.addEventListener('click',generateResults);
searchRandom.addEventListener('click',generateRandom);

//getting favorites as soon as window is loaded and clearing previous searches
window.onload=function() {
    searchInput.value="";
    favorites=JSON.parse(localStorage.getItem('favorites')) || [];
}

//this function generates all available results based on input value
async function generateResults(){

    const query=searchInput.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data=await response.json();
    const meals=data.meals;
    displayCards(meals);
}

//this function generate a random meal
async function generateRandom(e){
    const query=searchInput.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data=await response.json();
    console.log(data);
    const meals=data.meals;
    displayCards(meals);
}

// this function display the cards using the meal details 
function displayCards(meals){
    
    searchResults.innerHTML='';

    if(meals){
        meals.forEach((meal)=>{
            //creating a card for each meal
            const mealCard=document.createElement('div');
            mealCard.classList.add('meal-card');
            mealCard.innerHTML=`
            <a class="mealPage-link" href="pages/meal.html?meal=${meal.strMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div id="meal-name">
                <h2>${meal.strMeal}</h2>
                <button id="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
            </div>
            </a>`;
            //updating card to  search results
            searchResults.appendChild(mealCard);

            const favoriteBtn=mealCard.querySelector('button');

            //adding red color to button if it is a favorite meal
            if(favorites.includes(meal.idMeal)){
                favoriteBtn.classList.add('red');
            }

            //function to add/remove favorites
            favoriteBtn.addEventListener('click', (e) =>{
                e.preventDefault();
                const favMeals=meal.idMeal;

                //if it is present in favorites then remove it from favorites and remove red color to button
                if(favorites.includes(meal.idMeal)){
                    favoriteBtn.classList.remove('red');
                    favorites=favorites.filter(item=>item!=favMeals);
                    localStorage.setItem('favorites',JSON.stringify(favorites));
                    generateResults();
                }else{
                //else add it to favorites and apply red color to button
                    favorites.push(favMeals);
                    localStorage.setItem('favorites',JSON.stringify(favorites));
                    favoriteBtn.classList.add('red');
                }
            })
        });
    }else{
        //if no result is found for user input show no results found
        searchResults.innerHTML='<h1>No results found</h1>';
    }
}