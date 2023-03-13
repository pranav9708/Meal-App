//variables
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const searchResults =document.querySelector('#search-results');

searchInput.addEventListener('input',displayResults);
searchButton.addEventListener('click',displayResults);

document.addEventListener('DOMContentLoaded',()=>{
    searchInput.innerText='';
})
async function displayResults(e){
    e.preventDefault();

    const query=searchInput.value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data=await response.json();
    console.log(data);
    const meals=data.meals;

    //clearing previous results
    searchResults.innerHTML='';

    if(meals){
        meals.forEach((meal)=>{
            const mealCard=document.createElement('div');
            mealCard.classList.add('meal-card');
            mealCard.innerHTML=`
            <a class="mealPage-link" href="pages/meal.html?meal=${meal.strMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </a>
            <div id="meal-name">
                <h2>${meal.strMeal}</h2>
                <button id="add-to-favorite"><i class="fa-solid fa-heart"></i></button>
            </div>`;
            searchResults.appendChild(mealCard);
        });
    }else{
        searchResults.innerHTML='No results found';
    }
}