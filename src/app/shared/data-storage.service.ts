import { AuthService } from './../auth/auth.service';
import { Recipe } from './recipe.model';
import { RecipeServie } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private readonly url = 'https://booking-recipe-default-rtdb.firebaseio.com/';
  constructor(
    private recipeService: RecipeServie,
    private http: HttpClient,
    private authService: AuthService
  ) {}
  updateRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(this.url + 'recipes.json', recipes)
      .subscribe((response) => {});
  }
  storeRecipe(recipe: Recipe) {
    this.http
      .post<Recipe[]>(this.url + 'recipes.json', recipe)
      .subscribe((response) => {});
  }
  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(this.url + 'recipes.json', {
          params: new HttpParams().set('auth', user?.token as string),
        });
      }),
      map((recipes) => {
        if (recipes) {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }
        return [];
      }),
      tap((recipes) => {
        const rescipesSrc = recipes ? recipes : [];
        this.recipeService.initRecipes(rescipesSrc);
      })
    );
  }
}
