import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'login');
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'login');
  }
}
