import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/recipes' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auht.module').then((m) => m.AuthModule),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipe.module').then((m) => m.RecipeModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
