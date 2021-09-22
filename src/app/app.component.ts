import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'laGed-frontend-angular';
  selectedTr: string = 'fr';
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  changeLanguage(event: any) {
    if (this.selectedTr === 'en') {
      this.selectedTr = 'fr';
    } else {
      this.selectedTr = 'en';
    }
    console.log('eve', this.selectedTr);
    this.translate.use(this.selectedTr);
  }
}
