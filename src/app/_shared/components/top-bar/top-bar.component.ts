import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  providers: [TitleCasePipe],
})
export class TopBarComponent implements OnInit {
  title: String = '';
  dropdownIsShow: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pipeCaseUpper: TitleCasePipe
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.title = this.pipeCaseUpper.transform(
          event?.urlAfterRedirects.split('/')[2]
        );
      });
  }

  ngOnInit(): void {}
}
