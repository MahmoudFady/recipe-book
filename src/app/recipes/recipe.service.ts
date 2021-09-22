import { Recipe } from './../shared/recipe.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipeServie {
  private recipes: Recipe[] = [
    new Recipe(
      'recipe name 1',
      'recipe description 1',
      'assets/recipes-img/recipe-1.jfif'
    ),
    new Recipe(
      'recipe name 2',
      'recipe description 2',
      'assets/recipes-img/recipe-2.jfif'
    ),
    new Recipe(
      'recipe name 3',
      'recipe description 3',
      'assets/recipes-img/recipe-3.jfif'
    ),
  ];
  constructor() {}
  getRecipes() {
    return [...this.recipes];
  }
}
