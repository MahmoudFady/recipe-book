import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListServie {
  private ingredients: Ingredient[] = [
    new Ingredient('apple', 20),
    new Ingredient('tomato', 5),
    new Ingredient('carots', 2),
  ];
  private updatedIngredients = new Subject<Ingredient[]>();
  private ingreditToEdit = new Subject<{
    index: number;
    ingredient: Ingredient;
  }>();
  constructor() {}
  getIngredients() {
    return this.ingredients;
  }
  addInredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updatedIngredients.next(this.ingredients);
  }
  onLoadEditedIngredient(index: number) {
    const ingredient = this.ingredients[index];
    this.ingreditToEdit.next({ index, ingredient });
  }
  updateIngredientByIndex(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.updatedIngredients.next(this.ingredients);
  }
  deleteIngredientByIndex(index: number) {
    this.ingredients.splice(index, 1);
    this.updatedIngredients.next(this.ingredients);
  }
  clearAllIngredient() {
    this.ingredients = [];
    this.updatedIngredients.next(this.ingredients);
  }
  getUpdatedIngredients() {
    return this.updatedIngredients.asObservable();
  }
  getIngredintToEdit() {
    return this.ingreditToEdit.asObservable();
  }
}
