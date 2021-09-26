import { Recipe } from './../../../shared/recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() index = 0;
  @Input() recipe: Recipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: [],
  };
  constructor() {}

  ngOnInit(): void {}
}
