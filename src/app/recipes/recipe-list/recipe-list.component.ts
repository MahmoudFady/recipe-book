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
  isLoading = false;
  constructor(
    private recipeService: RecipeServie,
    private dataStorageSer: DataStorageService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.dataStorageSer.fetchRecipes().subscribe(
      (recipes) => {
        this.isLoading = false;
      },
      (err) => {},
      () => {}
    );
    this.recipeService.getUpdatedRecipe().subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
