import { Recipe } from './../shared/recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeServie {
  private readonly url = 'https://booking-recipe-default-rtdb.firebaseio.com/';
  private SelectedRecipe = new Subject<Recipe>();
  private updatedRecipe = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  constructor() {}
  getRecipes() {
    return this.recipes;
  }
  initRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updatedRecipe.next(this.recipes);
  }
  getRecipeByIndex(index: number) {
    return this.recipes[index];
  }
  onSelectRecipe(recipe: Recipe) {
    this.SelectedRecipe.next(recipe);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updatedRecipe.next(this.recipes);
    // this.dataStorageSer.storeRecipe(recipe);
  }
  updateRecipeByIndex(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.updatedRecipe.next(this.recipes);
  }
  deleteRecipeByIndex(index: number) {
    this.recipes.splice(index, 1);
    this.updatedRecipe.next(this.recipes);
  }
  getSelectedRecipe() {
    return this.SelectedRecipe.asObservable();
  }
  getUpdatedRecipe() {
    return this.updatedRecipe.asObservable();
  }
}
