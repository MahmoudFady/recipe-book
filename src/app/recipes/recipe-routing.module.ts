import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { RecipesComponent } from './recipes.component';
const router: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent,
        resolve: [RecipesResolverService],
      },
      { path: 'new', component: RecipeEditComponent },
      { path: 'edit/:id', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule],
})
export class RecipeRoutingModules {}
