import { Component, HostListener } from '@angular/core';
import { MainNavbarComponent } from '../../components/main-navbar/main-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MainNavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  goUp() {
    scrollTo(0, 0);
  }
  showBtn: boolean = false;
  @HostListener('window:scroll') scrollToTop() {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 500) {
      this.showBtn = true;
    } else {
      this.showBtn = false;
    }
  }
}
