import { Ingredient } from './../../shared/ingredient.model';
import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @Output() newIngredientSrc = new EventEmitter<Ingredient>();
  @ViewChild('recipeName')
  recipeNameEle!: ElementRef;
  @ViewChild('recipeAmount')
  recipeAmountEle!: ElementRef;
  constructor() {}

  ngOnInit(): void {}
  onAddIngredient() {
    const name = this.recipeNameEle.nativeElement.value;
    const amount = this.recipeAmountEle.nativeElement.value;
    const newIngredient = new Ingredient(name, amount);
    this.newIngredientSrc.emit(newIngredient);
  }
}
