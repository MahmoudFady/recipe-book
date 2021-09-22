import { RecipeServie } from './../recipe.service';
import { Recipe } from './../../shared/recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSrc = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeServie) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  getRecipeDetail(recipe: Recipe) {
    this.recipeSrc.emit(recipe);
  }
}
