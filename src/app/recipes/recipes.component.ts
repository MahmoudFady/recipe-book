import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './../shared/recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  constructor(private dataStorageSer: DataStorageService) {}

  ngOnInit(): void {}
}
