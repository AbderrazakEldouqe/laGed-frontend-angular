import { Router } from '@angular/router';
import { AccountService } from './../../../_core/services/account.service';
import { TokenService } from './../../../_core/services/token.service';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SubSink } from 'subsink';
import { NotificationService } from 'src/app/_core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({});
  private subs = new SubSink();
  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'login');

    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('login info ********');
      console.log(this.loginForm.value);
      this.subs.add(
        this.authService
          .login(this.loginForm.value, {
            skip_token: 'true' /*skip_http_error_interceptor: 'true'*/,
          })
          .subscribe(
            (res: any) => this.handleResponse(res),
            (err: any) => this.handleError(err)
          )
      );
    }
  }

  handleResponse(data: any): void {
    this.tokenService.handle(data);
    this.accountService.changeStatus(true);
    console.log('info', this.tokenService.getInfos());
    //alert(`Bienvenu : ${this.tokenService.getInfos().userName}`);
    this.notification.success(
      `Bienvenu : ${this.tokenService.getInfos().userName}`,
      'Vous êtes connecté !'
    );
    this.router.navigateByUrl('/application');
  }

  handleError(error: any): void {
    console.log(error);
    //alert('Bienvenu :' + ' ' + error);

    this.notification.error(
      'Merci de Vérifier votre email ou mot de passe !',
      ``
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'login');
    this.subs.unsubscribe();
  }
}
