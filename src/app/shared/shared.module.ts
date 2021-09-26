import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, CommonModule],
})
export class SharedModule {}
