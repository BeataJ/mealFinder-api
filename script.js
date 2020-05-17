const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeadingEl = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Search meal and fetch from API
const searchMeal = (e) => {
  e.preventDefault();

  // Clear single meal
  single_mealEl.innerHTML = '';

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeadingEl.innerHTML = `<h2>Search result for '${term}'</h2>`;

        if (data.meals === null) {
          resultHeadingEl.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `
              <div class="meal">
                <img  src="${meal.strMealThumb}"  alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                </div>
              </div>
            `
            )
            .join('');
        }
      });
    // clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
};

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Event Listener
submit.addEventListener('submit', searchMeal);
mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  // console.log(mealInfo);

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
