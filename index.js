//variables
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const searchResults =document.querySelector('#search-results');
const searchRandom = document.querySelector('#search-random');

searchInput.addEventListener('input',generateResults);
searchButton.addEventListener('click',generateResults);
searchRandom.addEventListener('click',generateRandom);
window.onload=function() {
    searchInput.value="";
    favorites=JSON.parse(localStorage.getItem('favorites')) || [];
}

async function generateResults(){

    const query=searchInput.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data=await response.json();
    const meals=data.meals;
    displayCards(meals);
}


async function generateRandom(e){
    const query=searchInput.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data=await response.json();
    console.log(data);
    const meals=data.meals;
    displayCards(meals);
}

function displayCards(meals){
    
    searchResults.innerHTML='';

    if(meals){
        meals.forEach((meal)=>{
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
            searchResults.appendChild(mealCard);

            const favoriteBtn=mealCard.querySelector('button');

            if(favorites.includes(meal.idMeal)){
                favoriteBtn.classList.add('red');
            }

            favoriteBtn.addEventListener('click', (e) =>{
                e.preventDefault();
                const favMeals=meal.idMeal;

                if(favorites.includes(meal.idMeal)){
                    favoriteBtn.classList.remove('red');
                    favorites=favorites.filter(item=>item!=favMeals);
                    localStorage.setItem('favorites',JSON.stringify(favorites));
                    generateResults();
                }else{
                    favorites.push(favMeals);
                    localStorage.setItem('favorites',JSON.stringify(favorites));
                    favoriteBtn.classList.add('red');
                }
            })
        });
    }else{
        searchResults.innerHTML='No results found';
    }
}