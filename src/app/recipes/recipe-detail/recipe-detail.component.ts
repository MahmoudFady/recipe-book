import { RecipeServie } from './../recipe.service';
import { Recipe } from './../../shared/recipe.model';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  private opened = false;
  recipeIndex = 0;
  recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeServie,
    private dataStroageSer: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      const recipeSrc = this.recipeService.getRecipeByIndex(this.recipeIndex);
      this.recipe = recipeSrc ? recipeSrc : this.recipe;
      console.log('recipe detail', this.recipe);
    });
  }
  onToggle(dropDownMenu: HTMLUListElement) {
    dropDownMenu.style.display = this.opened ? 'none' : 'block';
    this.opened = !this.opened;
  }
  onDeleteRecipe(index: number) {
    this.recipeService.deleteRecipeByIndex(index);
    this.dataStroageSer.updateRecipes();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
