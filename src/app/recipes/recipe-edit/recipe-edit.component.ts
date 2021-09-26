import { RecipeServie } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  editingMode = false;
  recipeId: number = 0;
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    imagePath: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    ingredients: new FormArray([]),
  });
  recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeServie,
    private dataStorageSer: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const recipeIndex = params['id'];
      this.editingMode = recipeIndex ? true : false;
      if (this.editingMode) {
        this.recipe = this.recipeService.getRecipeByIndex(+recipeIndex);
        this.recipeId = +recipeIndex;
        this.initRecipeForm();
      }
    });
  }
  private initRecipeForm() {
    const { name, imagePath, description } = this.recipe;
    const ingredients = new FormArray([]);
    if (this.recipe.ingredients) {
      for (let ingredient of this.recipe.ingredients) {
        const { name, amount } = ingredient;
        ingredients.push(
          new FormGroup({
            name: new FormControl(name),
            amount: new FormControl(amount),
          })
        );
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      imagePath: new FormControl(imagePath, [Validators.required]),
      description: new FormControl(description, [Validators.required]),
      ingredients: ingredients,
    });
  }
  onAddNewIngredientCtrl() {
    const ctrl = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(ctrl);
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel() {
    this.router.navigate(['/recipes', this.recipeId]);
  }
  getIngredientCtrls() {
    return (<FormArray>this.recipeForm.get('ingredients'))!.controls;
  }
  onSubmit() {
    const recipe: Recipe = this.recipeForm.value;
    if (this.editingMode) {
      this.recipeService.updateRecipeByIndex(this.recipeId, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.dataStorageSer.updateRecipes();
    this.onCancel();
  }
}
