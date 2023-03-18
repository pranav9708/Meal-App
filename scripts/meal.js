//variables
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const meal = urlParams.get('meal');
const mealInfo=document.getElementById('meal-info');
const mealImg=document.getElementById('meal-img');
const mealYoutube=document.getElementById('meal-youtube');
const mealIngredient=document.getElementById('meal-ingredients');
const mealInstructions=document.getElementById('meal-instructions');

document.addEventListener('DOMContentLoaded',async()=>{
    const response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    const data=await response.json();
    const mealData=data.meals[0];

    //adding meal name and origin in head section
    const mealName=document.createElement('p');
    mealName.innerText=`${mealData.strMeal}`;
    const mealOrigin=document.createElement('p');
    mealOrigin.innerText=`Area- ${mealData.strArea} `;
    const mealCategory=document.createElement('p');
    mealCategory.innerText=`Category- ${mealData.strCategory}`;

    mealInfo.appendChild(mealName);
    mealInfo.appendChild(mealOrigin);
    mealInfo.appendChild(mealCategory);


    //add mealImage to head-section
    mealImg.innerHTML=`<img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">`

    //add meal youtube video
    let videoParam = mealData.strYoutube.split('?')[1];
    let videoId=videoParam.split('=')[1];
    mealYoutube.innerHTML=`<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    
    //adding meal ingredients
    const ingredients = [];
    const measures = [];
    for (const key in mealData) {
        if (mealData.hasOwnProperty(key)) {
            if (key.startsWith('strIngr') && mealData[key]!=null && mealData[key].length>0) {
                ingredients.push(mealData[key]);
            } else if (key.startsWith('strMeasure')) {
                measures.push(mealData[key]);
            }
        }
    }

    for (let i = 0; i < ingredients.length; i++) {
        const listItem= document.createElement('li');
        listItem.innerHTML=`<span>${ingredients[i]} - ${measures[i]}</span>`
        mealIngredient.appendChild(listItem);
    }

    //add meal recipe instructions
    console.log(mealData);
    mealInstructions.innerHTML=`<h3>Recipe</h3><p>   ${mealData.strInstructions}</p>`
})
