import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('apple', 20),
    new Ingredient('tomato', 5),
    new Ingredient('carots', 2),
  ];
  constructor() {}

  ngOnInit(): void {}
  onAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
