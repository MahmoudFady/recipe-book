import { Recipe } from './../shared/recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  viewRecipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
  };
  constructor() {}

  ngOnInit(): void {}
  viewRecipeDetail(recipe: Recipe) {
    this.viewRecipe = recipe;
  }
}
