import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  selectedLanguage$ = new BehaviorSubject("en")

  switchTo(lang : 'en' | 'sw') {
    this.selectedLanguage$.next(lang)
    localStorage.setItem('lang', lang)
  }
}
