import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarCollapse')
  navbarCollapse!: ElementRef;
  opened = false;
  @Output() selectedFeature = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  onSelect(feature: string) {
    this.selectedFeature.emit(feature);
  }
  onToggleNavbar() {
    const collapseEle = this.navbarCollapse.nativeElement;
    collapseEle.style.display = this.opened ? 'none' : 'block';
    this.opened = !this.opened;
  }
}
