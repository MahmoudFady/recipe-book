import { ModalComponent } from './modal/modal.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoadingSpinnerComponent, ModalComponent],
  imports: [CommonModule],
  exports: [CommonModule, LoadingSpinnerComponent, ModalComponent],
})
export class SharedModule {}
