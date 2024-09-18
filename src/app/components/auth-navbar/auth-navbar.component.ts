import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss',
})
export class AuthNavbarComponent implements OnInit {
  private readonly _TranslationService = inject(TranslationService);
  readonly _TranslateService = inject(TranslateService);

  isMenuOpen: boolean = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLang(): void {
    const newLang = this._TranslateService.currentLang === 'en' ? 'ar' : 'en';
    this.selectLang(newLang);
  }
  toggleLangAndMenu() {
    this.toggleLang();
    this.toggleMenu();
  }
  selectLang(lang: string): void {
    this._TranslationService.changeLang(lang);
  }

  ngOnInit(): void {
    this._TranslationService.changeDirection();
  }
}
