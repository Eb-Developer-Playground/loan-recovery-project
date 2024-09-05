import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SidebarComponent } from './views/side-bar/side-bar.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, DashboardComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'] 
})
export class AppComponent {
  title = 'loan-recovery-platform';

  constructor(public translateService: TranslateService, public translationService: TranslationService) {
    translateService.addLangs(['en','sw'])
    translateService.setDefaultLang('en')


    translateService.use(localStorage.getItem('lang') || 'en')

    translationService.selectedLanguage$.subscribe({
      next: (lang) => {
        translateService.use(lang)
      }
    })

   
  }
}
