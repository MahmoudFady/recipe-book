import { DataStorageService } from './../../shared/data-storage.service';
import { RecipeServie } from './../recipe.service';
import { Recipe } from './../../shared/recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  constructor(
    private recipeService: RecipeServie,
    private dataStorageSer: DataStorageService
  ) {}
  ngOnInit(): void {
    this.dataStorageSer.fetchRecipes().subscribe((recipes) => {
      console.log(recipes);
    });
    this.recipeService.getUpdatedRecipe().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
