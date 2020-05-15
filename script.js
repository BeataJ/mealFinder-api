const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeadingEl = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

// Event Listener
submit.addEventListener('submit', searchMeal);
