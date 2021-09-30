import { ModalService } from './modal.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  message = '';
  constructor(private modalService: ModalService) {}
  ngOnInit() {
    this.modalService.getMessage().subscribe((msg) => {
      this.message = msg;
      console.log('msg ::', msg);
    });
  }
  onChange(val: boolean) {
    this.modalService.setResualtValue(val);
  }
}
