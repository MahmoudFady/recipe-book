import { RecipeServie } from './recipe.service';
import { Recipe } from './../shared/recipe.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageSer: DataStorageService,
    private recipeService: RecipeServie
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes();
    return recipes.length !==0 ? recipes : this.dataStorageSer.fetchRecipes();
  }
}
