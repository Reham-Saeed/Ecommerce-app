import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private _TranslateService: TranslateService) {
    const savedLang = localStorage.getItem('lang') || 'en';
    this._TranslateService.setDefaultLang(savedLang);
    this._TranslateService.use(savedLang);
    this.changeDirection();
  }
  changeDirection() {
    const savedLang = localStorage.getItem('lang') || 'en';
    if (savedLang == 'en') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else if (savedLang == 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    }
  }
  public changeLang(lang: string) {
    this._TranslateService.setDefaultLang(lang);
    this._TranslateService.use(lang);
    localStorage.setItem('lang', lang);
    this.changeDirection();
  }
}
