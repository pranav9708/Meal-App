//variables
//getting all favorites stored in localStorage
let favoriteIds=JSON.parse(localStorage.getItem('favorites')) || [];
//favorites result div which contains all the favorite meal card and heading
const favoriteRes=document.getElementById('favorite-results');

async function favorites(){

    //change heading if there is no favorites in localStorage
    if(favoriteIds.length <1){
        favoriteRes.innerHTML='<h1>No Favorites found</h1>';
    }else{
    //change heading if there is favorites in localStorage
        favoriteRes.innerHTML='<h1>Here is your favorites list</h1>';
    }

    //getting each meal and display it in card
    for(id of favoriteIds){
        const response =await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data= await response.json();
        const meal=data.meals;
        displayMeal(meal[0]);
    }

}

//function to display mealCard on screen
function displayMeal(meal){

    const mealCard=document.createElement('div');
    mealCard.classList.add('meal-card');
    mealCard.innerHTML=`
        <a class="mealPage-link" href="meal.html?meal=${meal.strMeal}">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div id="meal-name">
            <h2>${meal.strMeal}</h2>
            <button id="add-to-favorite" class="red"><i class="fa-solid fa-heart"></i></button>
        </div>
        </a>`;

    //adding meal card to result
    favoriteRes.appendChild(mealCard);

    const favoriteBtn=mealCard.querySelector('button');

    //removing from favorites if button is clicked and rerendering page
    favoriteBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        const favMeals=meal.idMeal;
        favoriteIds=favoriteIds.filter(item=>item!=favMeals);
        localStorage.setItem('favorites',JSON.stringify(favoriteIds));
        favorites();
    })
}

favorites();