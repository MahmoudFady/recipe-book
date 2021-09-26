import { ShoppingListServie } from './shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  constructor(private shoppinListService: ShoppingListServie) {}

  ngOnInit(): void {
    this.ingredients = this.shoppinListService.getIngredients();
    this.shoppinListService.getUpdatedIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }
  onEditIngredient(index: number) {
    this.shoppinListService.onLoadEditedIngredient(index);
  }
}
