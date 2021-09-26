import { AuthService } from './../auth/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarCollapse')
  navbarCollapse!: ElementRef;
  opened = false;
  isAuthenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }

  onToggleNavbar() {
    const collapseEle = this.navbarCollapse.nativeElement;
    collapseEle.style.display = this.opened ? 'none' : 'block';
    this.opened = !this.opened;
  }
  onLogout() {
    this.authService.logout();
  }
}
