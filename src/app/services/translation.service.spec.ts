import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationService]
    });
    service = TestBed.inject(TranslationService);
    localStorage.clear(); 
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should have default language as "en"', () => {
    service.selectedLanguage$.subscribe(lang => {
      expect(lang).toBe('en');
    });
  });

  it('should change language and update localStorage', () => {
    service.switchTo('sw');
    
 
    service.selectedLanguage$.subscribe(lang => {
      expect(lang).toBe('sw');
    });

   
    expect(localStorage.getItem('lang')).toBe('sw');
  });
});
