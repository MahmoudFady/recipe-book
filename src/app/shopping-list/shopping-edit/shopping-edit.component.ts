import { ShoppingListServie } from './../shopping-list.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  editingMode = false;
  btnContext = '+ add';
  ingredientIndex = 0;
  @ViewChild('f') ingredientForm!: NgForm;
  constructor(private shoppingListService: ShoppingListServie) {}

  ngOnInit(): void {
    this.shoppingListService.getIngredintToEdit().subscribe((resualt) => {
      const { name, amount } = resualt.ingredient;
      this.ingredientForm.setValue({
        name,
        amount,
      });
      this.ingredientIndex = resualt.index;
      this.editingMode = true;
      this.changeMode();
    });
  }
  onAddIngredient(f: NgForm) {
    const { name, amount } = f.value;
    const newIngredient = new Ingredient(name, amount);
    if (!this.editingMode) {
      this.shoppingListService.addInredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredientByIndex(this.ingredientIndex, {
        name,
        amount,
      });
    }
    this.editingMode = false;
    f.reset();
    this.changeMode();
  }
  onDeleteIngredient() {
    this.shoppingListService.deleteIngredientByIndex(this.ingredientIndex);
    this.editingMode = false;
    this.ingredientForm.reset();
    this.changeMode();
  }
  onCancel() {
    this.ingredientForm.reset();
    this.editingMode = false;
    this.changeMode();
  }
  changeMode() {
    this.btnContext = this.editingMode ? 'edit' : '+ add';
  }
}
