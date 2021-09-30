import { ModalService } from './../../shared/modal/modal.service';
import { RecipeServie } from './../recipe.service';
import { Recipe } from './../../shared/recipe.model';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  private Sub: Subscription = new Subscription();
  private opened = false;
  displayModal = false;
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
    private dataStroageSer: DataStorageService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipeIndex = +params['id'];
      const recipeSrc = this.recipeService.getRecipeByIndex(this.recipeIndex);
      this.recipe = recipeSrc ? recipeSrc : this.recipe;
    });
    this.Sub = this.modalService
      .getResualtValue()
      .subscribe((okDeleteRecipe) => {
        if (okDeleteRecipe) {
          this.onDeleteRecipe();
        }
        this.displayModal = false;
      });
  }
  onToggle(dropDownMenu: HTMLUListElement) {
    dropDownMenu.style.display = this.opened ? 'none' : 'block';
    this.opened = !this.opened;
  }
  onDeleteRecipe() {
    const index = this.recipeIndex;
    this.recipeService.deleteRecipeByIndex(index);
    this.dataStroageSer.updateRecipes();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onDisplayModal() {
    this.modalService.setMessage('delete recipe');
    this.displayModal = true;
  }
  ngOnDestroy() {
    this.Sub.unsubscribe();
  }
}
